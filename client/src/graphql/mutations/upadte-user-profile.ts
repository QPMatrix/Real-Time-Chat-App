import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateProfile($fullName: String!, $file: Upload) {
    updateProfile(fullName: $fullName, file: $file) {
      id
      fullName
      avatarUrl
    }
  }
`;
