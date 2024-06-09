"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.paymentType = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    payments(email:String!): [Payment!]!\n    payment(id: String!): Payment\n  }\n\n  extend type Mutation {\n    createPayment(\n    email: String!\n    amount: Int!\n    payment_method: String!\n    Stripe_charge_id: String!\n    ): Payment!\n  }\n"], ["\n  extend type Query {\n    payments(email:String!): [Payment!]!\n    payment(id: String!): Payment\n  }\n\n  extend type Mutation {\n    createPayment(\n    email: String!\n    amount: Int!\n    payment_method: String!\n    Stripe_charge_id: String!\n    ): Payment!\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=Payment.js.map