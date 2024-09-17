import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($fullname: String!) {
    searchUsers(fullName: $fullname) {
      id
      fullname
      email
      avatarUrl
    }
  }
`;
