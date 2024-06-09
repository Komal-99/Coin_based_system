import { gql } from "apollo-server-express";

export const walletType = gql`
  extend type Query {
    wallet(userId: String!): Wallet!
    walletByEmail(email: String!): Wallet!
  }

  extend type Mutation {
    updateWallet(
      balance: Int
      email: String
    ): Wallet!
    deleteWallet(id: String!): Wallet!
  }
`;
