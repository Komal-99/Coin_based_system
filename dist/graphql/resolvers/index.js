"use strict";
// src/graphql/resolvers/index.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var credit_1 = require("./credit");
var payment_1 = require("./payment");
var transaction_1 = require("./transaction");
var user_1 = require("./user");
var wallet_1 = require("./wallet");
exports.resolvers = {
    Query: __assign(__assign(__assign(__assign(__assign({}, user_1.userResolvers.Query), wallet_1.walletResolvers.Query), payment_1.paymentResolvers.Query), transaction_1.transactionResolvers.Query), credit_1.creditResolvers.Query),
    Mutation: __assign(__assign(__assign(__assign(__assign({}, user_1.userResolvers.Mutation), wallet_1.walletResolvers.Mutation), payment_1.paymentResolvers.Mutation), transaction_1.transactionResolvers.Mutation), credit_1.creditResolvers.Mutation),
};
//# sourceMappingURL=index.js.map