import { gql } from "apollo-server-express";

import { userType } from "./user";
import { transactionType } from "./Transaction";
import { paymentType } from "./Payment";
import { creditType } from "./Credit";
import { walletType } from "./Wallet";

export const typeDefs = gql`
  type User {
    id:   String!      
    username:  String!       
    email:   String!       
    password: String!
    createdAt:   DateTime!          
    Wallet:  Wallet!       
    Credit:     [Credit!]!
    Transaction: [Transaction!]!
    Payment:     [Payment!]!
  }

  type Wallet {
    #User wallet 
    id:               String!
    balance:           Int!
    last_updated_date: DateTime!
    userId:            String!
    User:            [User!]!
  }

  type Credit {
    id:           String!    
    user_id:         User!       
    credits:        Int!
    type:      CreditType!   #type of credit - refresh  or purchased 
    last_reset_date: DateTime!
    userId:          String!
  }

  type Transaction {
    id:               String!         
    user_id:          User!           
    type:             TransactionType!
    amount:           Int!
    transaction_date: DateTime!
    userId:           String!
    Payment:          [Payment!]!
  }

  type Payment {
    id:               String!        
    user_id:          User!     
    transaction_id:   Transaction!  
    amount:           Int!
    payment_method:   String!
    payment_status:   PaymentStatus!
    Stripe_charge_id: String!
    payment_date:     DateTime!
    userId:           String!
    transactionId:    String!
  }

  enum CreditType {
    REFRESH
    PURCHASED
  }
  
  enum PaymentStatus {
    PENDING
    SUCCESS
    FAILED
  }
  
  enum TransactionType {
    PURCHASE
    REFRESH
  }
  type Query {
    _emptyQuery: String
  }

  type Mutation {
    _emptyMutation: String
  }
scalar DateTime
  ${userType}
  ${transactionType}
  ${paymentType}
  ${creditType}
  ${walletType}
`;
