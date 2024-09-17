import { gql } from '@apollo/client';

export const GET_USERS_OF_CHATROOM = gql`
  query GetUsersOfChatroom($chatroomId: String!) {
    getUsersOfChatroom(chatRoomId: $chatroomId) {
      id
      fullName
      email
      avatarUrl
    }
  }
`;
