import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($fullName: String!) {
    searchUsers(fullName: $fullName) {
      id
      fullName
      email
      avatarUrl
    }
  }
`;
