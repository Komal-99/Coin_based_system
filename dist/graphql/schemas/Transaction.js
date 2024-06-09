"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.transactionType = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    transactions(email: String!): [Transaction!]!\n    transaction(id: String!): Transaction!\n  }\n\n  extend type Mutation {\n    deleteTransaction(id: String!): Transaction!\n    consumeService(\n      email: String!\n      no_of_question: Int!\n      type_of_question: String!\n      size_of_document: Int!\n      ques_regenerate: Boolean!\n    ): Wallet!\n  }\n"], ["\n  extend type Query {\n    transactions(email: String!): [Transaction!]!\n    transaction(id: String!): Transaction!\n  }\n\n  extend type Mutation {\n    deleteTransaction(id: String!): Transaction!\n    consumeService(\n      email: String!\n      no_of_question: Int!\n      type_of_question: String!\n      size_of_document: Int!\n      ques_regenerate: Boolean!\n    ): Wallet!\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=Transaction.js.map