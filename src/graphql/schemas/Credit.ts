import { gql } from "apollo-server-express";

export const creditType = gql`
  extend type Query {
    credit(email: String!): Credit!
    filterByType(type: CreditType!): Credit!

  }

  extend type Mutation {
    updateCredit(
      credits: Int!
      type: CreditType!
      email: String!
    ): Credit!
    deleteCredit(id: String!): Credit!
  }
`;
