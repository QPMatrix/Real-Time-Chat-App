import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(loginInput: {email: $email, password: $password}) {
            user{
                email
                id
                fullName
                avatarUrl
            }
        }
    }
`;
