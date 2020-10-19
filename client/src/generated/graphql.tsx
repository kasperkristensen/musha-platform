import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  parties: Array<Party>;
  partiesByUserId: Array<Party>;
  party?: Maybe<Party>;
  me?: Maybe<User>;
  users: Array<User>;
  user?: Maybe<User>;
};


export type QueryPartiesByUserIdArgs = {
  userId: Scalars['Int'];
};


export type QueryPartyArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export type Party = {
  __typename?: 'Party';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  parties: Array<Party>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  spotifyId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createParty: Party;
  updateParty?: Maybe<Party>;
  deleteParty: Scalars['Boolean'];
  deleteAllParties: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  deleteAllUsers: Scalars['Boolean'];
};


export type MutationCreatePartyArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdatePartyArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeletePartyArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UserInformation;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInformation = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  spotifyId: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  displayName: Scalars['String'];
  email: Scalars['String'];
  spotifyId: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName'>
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!) {
  login(email: $email) {
    errors {
      field
      message
    }
    user {
      id
      displayName
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($displayName: String!, $email: String!, $spotifyId: String!) {
  register(options: {displayName: $displayName, email: $email, spotifyId: $spotifyId}) {
    errors {
      field
      message
    }
    user {
      id
      displayName
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UserDocument = gql`
    query User($email: String!) {
  user(email: $email) {
    id
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};