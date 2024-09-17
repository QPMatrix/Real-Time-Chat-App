import { gql } from '@apollo/client';

export const GET_CHATROOMS_FOR_USER = gql`
  query GetChatroomsForUser($userId: String!) {
    getChatRoomForUser(userId: $userId) {
      id
      name
      messages {
        id
        content
        createdAt
        user {
          id
          fullName
        }
      }
      users {
        avatarUrl
        id
        fullName
        email
      }
    }
  }
`;
