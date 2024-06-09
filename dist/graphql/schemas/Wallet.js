"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.walletType = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    wallet(userId: String!): Wallet!\n    walletByEmail(email: String!): Wallet!\n  }\n\n  extend type Mutation {\n    updateWallet(\n      balance: Int\n      email: String\n    ): Wallet!\n    deleteWallet(id: String!): Wallet!\n  }\n"], ["\n  extend type Query {\n    wallet(userId: String!): Wallet!\n    walletByEmail(email: String!): Wallet!\n  }\n\n  extend type Mutation {\n    updateWallet(\n      balance: Int\n      email: String\n    ): Wallet!\n    deleteWallet(id: String!): Wallet!\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=Wallet.js.map