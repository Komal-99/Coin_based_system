import { Credit, CreditType, PrismaClient, User, Wallet, Transaction, TransactionType } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";
import { calculateCredits } from "../../functions/transaction";

const prisma = new PrismaClient();

interface DeleteTransactionArgs {
  id: string;
}
interface ConsumeServiceArgs {
  id: string;
  no_of_question: number;
  type_of_question: "MCQ" | "TEXT";
  size_of_document: number;
  ques_regenerate: boolean;
}


export const transactionResolvers = {
  Query: {
    transactions: async (_: any, { userId, res }: { userId: string, res: Response }): Promise<Transaction[] | null> => {
      try {
        return await prisma.transaction.findMany({ where: { userId }, include: {Payment: true}});
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
    transaction: async (_: any, { id, res }: { id: string, res: Response }): Promise<Transaction | null> => {
      try {
        return await prisma.transaction.findUnique({ where: { id } });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
  },
  Mutation: {
    deleteTransaction: async (
      _: any,
      { id }: DeleteTransactionArgs,
      { res }: { res: Response }
    ): Promise<Transaction | null> => {
      try {
        return await prisma.transaction.delete({ where: { id } });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
    consumeService: async (_: any,
      { id, no_of_question, type_of_question, size_of_document, ques_regenerate }: ConsumeServiceArgs,
      { res }: { res: Response }
    ) => {

      const credit = calculateCredits({ size_of_document: size_of_document, no_of_ques: no_of_question, type_of_ques: type_of_question, ques_regenerate: ques_regenerate })
      try {
        // update this  transaction will be only created when credit is less than or equal to the balance in wallet 
        console.log(credit)
        const wallet = await prisma.wallet.findUnique({ where: { userId: id } });
        if (wallet && credit <= wallet.balance) {
          await prisma.transaction.create({
            data: {
              amount: credit,
              userId: id,
              type: TransactionType.CONSUMED,
            },
          })
          await prisma.credit.create({
            data: {
              credits: credit,
              type: CreditType.CONSUMED,
              userId: id,
            },
          })
          const updated_wallet = await prisma.wallet.update({ where: { userId: id }, data: { balance: { decrement: credit } } });
          return updated_wallet;
        } else {
          throw new Error("Insufficient balance in wallet");
        }

      } catch (error) {
        return handlePrismaError(error, res);
      }


    }
  }
}
