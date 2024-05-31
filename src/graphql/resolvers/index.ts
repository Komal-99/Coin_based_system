// src/graphql/resolvers/index.ts

import { creditResolvers } from "./credit";
import { paymentResolvers } from "./payment";
import { transactionResolvers } from "./transaction";
import { userResolvers } from "./user";
import { walletResolvers } from "./wallet";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...walletResolvers.Query,
    ...paymentResolvers.Query,
    ...transactionResolvers.Query,
    ...creditResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...walletResolvers.Mutation,
    ...paymentResolvers.Mutation,
    ...transactionResolvers.Mutation,
    ...creditResolvers.Mutation,  
    
  },
};
