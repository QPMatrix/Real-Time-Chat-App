import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation RegisterUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        fullName: $fullname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      user {
        id
        fullName
        email
      }
    }
  }
`;
