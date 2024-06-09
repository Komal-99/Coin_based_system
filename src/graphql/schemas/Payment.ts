import { gql } from "apollo-server-express";

export const paymentType = gql`
  extend type Query {
    payments(email:String!): [Payment!]!
    payment(id: String!): Payment
  }

  extend type Mutation {
    createPayment(
    email: String!
    amount: Int!
    payment_method: String!
    Stripe_charge_id: String!
    ): Payment!
  }
`;
