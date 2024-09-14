import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
    mutation RegisterUser($fullname: String!, $email: String!, $password: String!,$confrimPassword: String!) {
        register(registerInput: {fullname: $fullname, email: $email, password: $password , confirmPassword: $confrimPassword}) {
            user{
                email
                id
                fullName
            }
        }
    }
`;