import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateProfile($fullname: String!, $file: Upload) {
    updateProfile(fullname: $fullname, file: $file) {
      id
      fullName
      avatarUrl
    }
  }
`;
