import { gql } from "apollo-server-express";

export const creditType = gql`
  extend type Query {
    credit(userId: String!): Credit!
    filterByType(type: CreditType!): Credit!

  }

  extend type Mutation {
    createCredit(
      credits: Int!
      type: CreditType!
      userId: String!
    ): Credit!
    updateCredit(
      credits: Int!
      type: CreditType!
      userId: String!
    ): Credit!
    deleteCredit(id: String!): Credit!
  }
`;
