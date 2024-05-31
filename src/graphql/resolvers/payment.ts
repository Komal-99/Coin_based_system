import { Credit, CreditType, PrismaClient, User, Wallet, Payment, Transaction, TransactionType, PaymentStatus } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";

const prisma = new PrismaClient();

interface CreatePaymenttArgs {
  userId: string;
  amount: number;
  type: TransactionType;
  payment_method: string;
  Stripe_charge_id: string;

}

export const paymentResolvers = {
  Query: {
    payments: async (_: any, { userId, res }: { userId: string, res: Response }): Promise<Payment[] | null> => {
      try {
        return await prisma.payment.findMany({ where: { userId } });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
    payment: async (_: any, { id, res }: { id: string, res: Response }): Promise<Payment | null> => {
      try {
        return await prisma.payment.findUnique({ where: { id } });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
  },
  Mutation: {
    // create Transaction and then create a payment using transactionId
    createPayment: async (
      _: any,
      { userId, amount, payment_method, Stripe_charge_id }: CreatePaymenttArgs,
      { res }: { res: Response }
    ): Promise<Payment> => {
      try {

        const transaction = await prisma.transaction.create({
          data: {
            amount,
            userId,
            type: TransactionType.PURCHASE,
          },
        });

        const pay = await prisma.payment.create({
          data: {
            amount,
            payment_method,
            transactionId: transaction.id,
            userId,
            payment_status: PaymentStatus.SUCCESS,
            Stripe_charge_id: Stripe_charge_id,

          },

        })
        console.log(pay);
        const credit = await prisma.credit.create({
          data: {
            credits: parseInt(pay.amount.toString()),
            type: CreditType.PURCHASED,
            userId
          }
        });
        await prisma.wallet.update({ where: { userId }, data: { balance: { increment: credit.credits } } });
        return pay;
      }
      catch (error) {
        return handlePrismaError(error, res);

      }
    },

  }
}

