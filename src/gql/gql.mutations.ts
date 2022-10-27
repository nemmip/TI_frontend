import { gql } from 'apollo-angular';

export const LOGIN_WITH_EMAIL_MUTATION = gql`
  mutation createLoginSession($input: AuthLoginInput!) {
    createLoginSession(input: $input)
  }
`;

export const REFRESH_USER_SESSION = gql`
  mutation refreshLoginSession($input: String!) {
    refreshLoginSession(input: $input)
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createRegularUser($input: UserCreateInput!) {
    createRegularUser(input: $input) {
      uuid
    }
  }
`;

export const GET_USER_CONTACTS = gql`
  mutation getUserContacts {
    contactsGetByUser {
      uuid
      name
    }
  }
`;

export const DELETE_USER_CONTACT = gql`
  mutation contactDelete($input: String!) {
    contactDelete(input: $input)
  }
`;

export const ADD_USER_CONTACT = gql`
  mutation contactAdd($input: String!) {
    contactAdd(input: $input) {
      uuid
      name
      email
      type
      groupUuid
      savedContacts {
        uuid
        contactUuid
      }
    }
  }
`;
