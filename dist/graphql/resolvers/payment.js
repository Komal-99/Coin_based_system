"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentResolvers = void 0;
var client_1 = require("@prisma/client");
var requests_handler_1 = require("../../utils/requests-handler");
var prisma = new client_1.PrismaClient();
exports.paymentResolvers = {
    Query: {
        payments: function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
            var user, error_1;
            var email = _b.email, res = _b.res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        return [4 /*yield*/, prisma.payment.findMany({ where: { userId: user.id } })];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3:
                        error_1 = _c.sent();
                        return [2 /*return*/, (0, requests_handler_1.handlePrismaError)(error_1, res)];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        payment: function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
            var error_2;
            var id = _b.id, res = _b.res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.payment.findUnique({ where: { id: id } })];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        error_2 = _c.sent();
                        return [2 /*return*/, (0, requests_handler_1.handlePrismaError)(error_2, res)];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
    },
    Mutation: {
        // create Transaction and then create a payment using transactionId
        createPayment: function (_1, _a, _b) { return __awaiter(void 0, [_1, _a, _b], void 0, function (_, _c, _d) {
            var user, transaction, pay, credit, error_3;
            var email = _c.email, amount = _c.amount, payment_method = _c.payment_method, Stripe_charge_id = _c.Stripe_charge_id;
            var res = _d.res;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                    case 1:
                        user = _e.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        return [4 /*yield*/, prisma.transaction.create({
                                data: {
                                    amount: amount,
                                    userId: user.id,
                                    type: client_1.TransactionType.PURCHASE,
                                },
                            })];
                    case 2:
                        transaction = _e.sent();
                        return [4 /*yield*/, prisma.payment.create({
                                data: {
                                    amount: amount,
                                    payment_method: payment_method,
                                    transactionId: transaction.id,
                                    userId: user.id,
                                    payment_status: client_1.PaymentStatus.SUCCESS,
                                    Stripe_charge_id: Stripe_charge_id,
                                },
                            })];
                    case 3:
                        pay = _e.sent();
                        console.log(pay);
                        return [4 /*yield*/, prisma.credit.create({
                                data: {
                                    credits: parseInt(pay.amount.toString()),
                                    type: client_1.CreditType.PURCHASED,
                                    userId: user.id,
                                }
                            })];
                    case 4:
                        credit = _e.sent();
                        return [4 /*yield*/, prisma.wallet.update({ where: { userId: user.id }, data: { balance: { increment: credit.credits } } })];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, pay];
                    case 6:
                        error_3 = _e.sent();
                        return [2 /*return*/, (0, requests_handler_1.handlePrismaError)(error_3, res)];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
    }
};
//# sourceMappingURL=payment.js.map