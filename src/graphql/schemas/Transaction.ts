import { gql } from "apollo-server-express";

export const transactionType = gql`
  extend type Query {
    transactions(email: String!): [Transaction!]!
    transaction(id: String!): Transaction!
  }

  extend type Mutation {
    deleteTransaction(id: String!): Transaction!
    consumeService(
      email: String!
      no_of_question: Int!
      type_of_question: String!
      size_of_document: Int!
      ques_regenerate: Boolean!
    ): Wallet!
  }
`;
