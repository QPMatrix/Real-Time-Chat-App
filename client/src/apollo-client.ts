import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useUserStore } from './store/user-store';
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';

loadErrorMessages();
loadDevMessages();

const { VITE_APP_API_URL } = import.meta.env;

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    const { data } = await client.mutate({
      mutation: gql`
          mutation RefreshToken {
              refreshToken
          }
      `,
    });
    const newAccessToken = data?.refreshToken;
    if (!newAccessToken) {
      throw new Error("New access token not received.");
    }
    return `Bearer ${newAccessToken}`;
  } catch (err) {
    console.log(err)
    throw new Error("Error getting new access token.");
  }
}

const wsLink = new WebSocketLink({
  uri: `ws://${VITE_APP_API_URL}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  },
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  let retryCount = 0;
  const maxRetry = 3;

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;

        return new Observable((observer) => {
          const client = operation.getContext().client;

          refreshToken(client)
            .then((token) => {
              console.log("New token", token);

              // Update the operation context with the new token
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: token,
                },
              }));

              // Retry the operation with the new token
              const forward$ = forward(operation);
              forward$.subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch((error) => {
              console.error("Failed to refresh token", error);
              observer.error(error);
            });
        });
      }

      if (err.message === "Refresh token not found") {
        console.log("Refresh token not found!");
        useUserStore.setState({
          id: undefined,
          fullName: "",
          email: "",
        });
      }
    }
  }
});

const uploadLink = createUploadLink({
  uri: `http://${VITE_APP_API_URL}/graphql`,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.from([errorLink, uploadLink])
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
