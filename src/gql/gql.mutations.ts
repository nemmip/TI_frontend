import { gql } from 'apollo-angular';

export const LOGIN_WITH_EMAIL_MUTATION = gql`
  mutation createLoginSession($input: AuthLoginInput!) {
    createLoginSession(input: $input)
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createRegularUser($input: UserCreateInput!) {
    createRegularUser(input: $input) {
      uuid
    }
  }
`;
