/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddUsersToChatRoom($chatRoomId: String!, $userIds: [String!]!) {\n    addUserToChatRoom(chatRoomId: $chatRoomId, usersIds: $userIds) {\n      name\n      id\n    }\n  }\n": types.AddUsersToChatRoomDocument,
    "\n  mutation CreateChatRoom($name: String!) {\n    createChatRoom(name: $name) {\n      name\n      id\n    }\n  }\n": types.CreateChatRoomDocument,
    "\n  mutation DeleteChatRoom($chatRoomId: String!) {\n    deleteChatRoom(chatRoomId: $chatRoomId)\n  }\n": types.DeleteChatRoomDocument,
    "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullName\n        avatarUrl\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    register(\n      registerInput: {\n        fullName: $fullname\n        email: $email\n        password: $password\n        confirmPassword: $confirmPassword\n      }\n    ) {\n      user {\n        id\n        fullName\n        email\n      }\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation UpdateProfile($fullName: String!, $file: Upload) {\n    updateProfile(fullName: $fullName, file: $file) {\n      id\n      fullName\n      avatarUrl\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query GetChatroomsForUser($userId: String!) {\n    getChatRoomForUser(userId: $userId) {\n      id\n      name\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullName\n        }\n      }\n      users {\n        avatarUrl\n        id\n        fullName\n        email\n      }\n    }\n  }\n": types.GetChatroomsForUserDocument,
    "\n  query GetMessagesForChatroom($chatroomId: String!) {\n    getMessagesForChatRoom(chatRoomId: $chatroomId) {\n      id\n      content\n      imageUrl\n      createdAt\n      user {\n        id\n        fullName\n        email\n        avatarUrl\n      }\n      chatroom {\n        id\n        name\n        users {\n          id\n          fullName\n          email\n          avatarUrl\n        }\n      }\n    }\n  }\n": types.GetMessagesForChatroomDocument,
    "\n  query GetUsersOfChatroom($chatroomId: String!) {\n    getUsersOfChatroom(chatRoomId: $chatroomId) {\n      id\n      fullName\n      email\n      avatarUrl\n    }\n  }\n": types.GetUsersOfChatroomDocument,
    "\n  query SearchUsers($fullName: String!) {\n    searchUsers(fullName: $fullName) {\n      id\n      fullName\n      email\n      avatarUrl\n    }\n  }\n": types.SearchUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUsersToChatRoom($chatRoomId: String!, $userIds: [String!]!) {\n    addUserToChatRoom(chatRoomId: $chatRoomId, usersIds: $userIds) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddUsersToChatRoom($chatRoomId: String!, $userIds: [String!]!) {\n    addUserToChatRoom(chatRoomId: $chatRoomId, usersIds: $userIds) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChatRoom($name: String!) {\n    createChatRoom(name: $name) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChatRoom($name: String!) {\n    createChatRoom(name: $name) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChatRoom($chatRoomId: String!) {\n    deleteChatRoom(chatRoomId: $chatRoomId)\n  }\n"): (typeof documents)["\n  mutation DeleteChatRoom($chatRoomId: String!) {\n    deleteChatRoom(chatRoomId: $chatRoomId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullName\n        avatarUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullName\n        avatarUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    register(\n      registerInput: {\n        fullName: $fullname\n        email: $email\n        password: $password\n        confirmPassword: $confirmPassword\n      }\n    ) {\n      user {\n        id\n        fullName\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    register(\n      registerInput: {\n        fullName: $fullname\n        email: $email\n        password: $password\n        confirmPassword: $confirmPassword\n      }\n    ) {\n      user {\n        id\n        fullName\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile($fullName: String!, $file: Upload) {\n    updateProfile(fullName: $fullName, file: $file) {\n      id\n      fullName\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($fullName: String!, $file: Upload) {\n    updateProfile(fullName: $fullName, file: $file) {\n      id\n      fullName\n      avatarUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatroomsForUser($userId: String!) {\n    getChatRoomForUser(userId: $userId) {\n      id\n      name\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullName\n        }\n      }\n      users {\n        avatarUrl\n        id\n        fullName\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChatroomsForUser($userId: String!) {\n    getChatRoomForUser(userId: $userId) {\n      id\n      name\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullName\n        }\n      }\n      users {\n        avatarUrl\n        id\n        fullName\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessagesForChatroom($chatroomId: String!) {\n    getMessagesForChatRoom(chatRoomId: $chatroomId) {\n      id\n      content\n      imageUrl\n      createdAt\n      user {\n        id\n        fullName\n        email\n        avatarUrl\n      }\n      chatroom {\n        id\n        name\n        users {\n          id\n          fullName\n          email\n          avatarUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessagesForChatroom($chatroomId: String!) {\n    getMessagesForChatRoom(chatRoomId: $chatroomId) {\n      id\n      content\n      imageUrl\n      createdAt\n      user {\n        id\n        fullName\n        email\n        avatarUrl\n      }\n      chatroom {\n        id\n        name\n        users {\n          id\n          fullName\n          email\n          avatarUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsersOfChatroom($chatroomId: String!) {\n    getUsersOfChatroom(chatRoomId: $chatroomId) {\n      id\n      fullName\n      email\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  query GetUsersOfChatroom($chatroomId: String!) {\n    getUsersOfChatroom(chatRoomId: $chatroomId) {\n      id\n      fullName\n      email\n      avatarUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchUsers($fullName: String!) {\n    searchUsers(fullName: $fullName) {\n      id\n      fullName\n      email\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($fullName: String!) {\n    searchUsers(fullName: $fullName) {\n      id\n      fullName\n      email\n      avatarUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;