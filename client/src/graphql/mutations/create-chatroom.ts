import { gql } from '@apollo/client';

export const CREATE_CHATROOM = gql`
  mutation CreateChatRoom($name: String!) {
    createChatRoom(name: $name) {
      name
      id
    }
  }
`;
