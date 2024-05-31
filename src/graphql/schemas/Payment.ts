import { gql } from "apollo-server-express";

export const paymentType = gql`
  extend type Query {
    payments(userId:String!): [Payment!]!
    payment(id: String!): Payment
  }

  extend type Mutation {
    createPayment(
    userId: String!
    amount: Int!
    payment_method: String!
    Stripe_charge_id: String!
    ): Payment!
  }
`;
