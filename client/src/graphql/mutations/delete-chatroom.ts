import { gql } from '@apollo/client';

export const DELETE_CHATROOM = gql`
  mutation DeleteChatRoom($chatRoomId: String!) {
    deleteChatRoom(chatRoomId: $chatRoomId)
  }
`;
