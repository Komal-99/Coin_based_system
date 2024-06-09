"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.userType = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    users: [User!]!\n    user(id: String!): User! \n    userByEmail(email: String!): User\n  }\n\n  extend type Mutation {\n    loginUser(email: String!, password: String!): User!\n    createUser(\n      username: String\n      email: String!\n      password: String\n    ): User!\n    updateUser(\n      id: String!\n      username: String\n      email: String\n      password: String\n    ): User!\n    deleteUser(id: String!): User!\n  }\n"], ["\n  extend type Query {\n    users: [User!]!\n    user(id: String!): User! \n    userByEmail(email: String!): User\n  }\n\n  extend type Mutation {\n    loginUser(email: String!, password: String!): User!\n    createUser(\n      username: String\n      email: String!\n      password: String\n    ): User!\n    updateUser(\n      id: String!\n      username: String\n      email: String\n      password: String\n    ): User!\n    deleteUser(id: String!): User!\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=user.js.map