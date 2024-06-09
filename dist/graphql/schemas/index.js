"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var user_1 = require("./user");
var Transaction_1 = require("./Transaction");
var Payment_1 = require("./Payment");
var Credit_1 = require("./Credit");
var Wallet_1 = require("./Wallet");
exports.typeDefs = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: String!\n    username: String!\n    email: String!\n    password: String!\n    createdAt: DateTime!\n    Wallet: Wallet!\n    Credit: [Credit!]!\n    Transaction: [Transaction!]!\n    Payment: [Payment!]!\n  }\n\n  type Wallet {\n    #User wallet\n    id: String!\n    balance: Int!\n    last_updated_date: DateTime!\n    userId: String!\n    User: [User!]!\n  }\n\n  type Credit {\n    id: String!\n    user_id: User!\n    credits: Int!\n    type: CreditType! #type of credit - refresh  or purchased\n    last_reset_date: DateTime!\n    userId: String!\n  }\n\n  type Transaction {\n    id: String!\n    user_id: User!\n    type: TransactionType!\n    amount: Int!\n    transaction_date: DateTime!\n    userId: String!\n    Payment: [Payment!]!\n  }\n\n  type Payment {\n    id: String!\n    user_id: User!\n    transaction_id: Transaction!\n    amount: Int!\n    payment_method: String!\n    payment_status: PaymentStatus!\n    Stripe_charge_id: String!\n    payment_date: DateTime!\n    userId: String!\n    transactionId: String!\n  }\n\n  enum CreditType {\n    REFRESH\n    PURCHASED\n  }\n\n  enum PaymentStatus {\n    PENDING\n    SUCCESS\n    FAILED\n  }\n\n  enum TransactionType {\n    PURCHASE\n    CONSUMED\n    REFRESH\n  }\n  type Query {\n    _emptyQuery: String\n  }\n\n  type Mutation {\n    _emptyMutation: String\n  }\n  scalar DateTime\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  type User {\n    id: String!\n    username: String!\n    email: String!\n    password: String!\n    createdAt: DateTime!\n    Wallet: Wallet!\n    Credit: [Credit!]!\n    Transaction: [Transaction!]!\n    Payment: [Payment!]!\n  }\n\n  type Wallet {\n    #User wallet\n    id: String!\n    balance: Int!\n    last_updated_date: DateTime!\n    userId: String!\n    User: [User!]!\n  }\n\n  type Credit {\n    id: String!\n    user_id: User!\n    credits: Int!\n    type: CreditType! #type of credit - refresh  or purchased\n    last_reset_date: DateTime!\n    userId: String!\n  }\n\n  type Transaction {\n    id: String!\n    user_id: User!\n    type: TransactionType!\n    amount: Int!\n    transaction_date: DateTime!\n    userId: String!\n    Payment: [Payment!]!\n  }\n\n  type Payment {\n    id: String!\n    user_id: User!\n    transaction_id: Transaction!\n    amount: Int!\n    payment_method: String!\n    payment_status: PaymentStatus!\n    Stripe_charge_id: String!\n    payment_date: DateTime!\n    userId: String!\n    transactionId: String!\n  }\n\n  enum CreditType {\n    REFRESH\n    PURCHASED\n  }\n\n  enum PaymentStatus {\n    PENDING\n    SUCCESS\n    FAILED\n  }\n\n  enum TransactionType {\n    PURCHASE\n    CONSUMED\n    REFRESH\n  }\n  type Query {\n    _emptyQuery: String\n  }\n\n  type Mutation {\n    _emptyMutation: String\n  }\n  scalar DateTime\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), user_1.userType, Transaction_1.transactionType, Payment_1.paymentType, Credit_1.creditType, Wallet_1.walletType);
var templateObject_1;
//# sourceMappingURL=index.js.map