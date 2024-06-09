"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.creditType = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    credit(email: String!): Credit!\n    filterByType(type: CreditType!): Credit!\n\n  }\n\n  extend type Mutation {\n    updateCredit(\n      credits: Int!\n      type: CreditType!\n      email: String!\n    ): Credit!\n    deleteCredit(id: String!): Credit!\n  }\n"], ["\n  extend type Query {\n    credit(email: String!): Credit!\n    filterByType(type: CreditType!): Credit!\n\n  }\n\n  extend type Mutation {\n    updateCredit(\n      credits: Int!\n      type: CreditType!\n      email: String!\n    ): Credit!\n    deleteCredit(id: String!): Credit!\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=Credit.js.map