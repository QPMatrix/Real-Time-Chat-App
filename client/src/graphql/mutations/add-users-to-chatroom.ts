import { gql } from '@apollo/client';

export const ADD_USERS_TO_CHATROOM = gql`
  mutation AddUsersToChatRoom($chatRoomId: String!, $userIds: [String!]!) {
    addUserToChatRoom(chatRoomId: $chatRoomId, usersIds: $userIds) {
      name
      id
    }
  }
`;
