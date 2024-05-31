import { gql } from "apollo-server-express";

export const userType = gql`
  extend type Query {
    users: [User!]!
    user(id: String!): User! 
  }

  extend type Mutation {
    loginUser(email: String!, password: String!): User!
    createUser(
      username: String
      email: String!
      password: String!
    ): User!
    updateUser(
      id: String!
      username: String
      email: String
      password: String
    ): User!
    deleteUser(id: String!): User!
  }
`;
