import { Credit, CreditType, PrismaClient, User } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";

const prisma = new PrismaClient();

interface UpdateCreditArgs{
  userId: string;
  type: CreditType;
  credits: number;
}

interface DeleteCreditArgs {
  id: string;
}

export const creditResolvers = {
    Query:{
        credit: async (_: any, { userId, res }: { userId: string, res: Response }): Promise<Credit[]> => {
            try {
              return await prisma.credit.findMany({ where: { userId } });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          },
          filterByType: async (_: any, { type, res }: { type: CreditType, res: Response }): Promise<Credit[] | null> => {
            try {
              return await prisma.credit.findMany({ where: { type } });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          },


    },
    Mutation:{
        updateCredit: async (
            _: any,
            { credits, type, userId }: UpdateCreditArgs,
            { res }: { res: Response }
          ): Promise<Credit> => {
            try {
              return await prisma.credit.create({
                data: { credits, type, userId },
              });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          },
          deleteCredit: async (
            _: any,
            { id }: DeleteCreditArgs,
            { res }: { res: Response }
          ): Promise<Credit | null> => {
            try {
              return await prisma.credit.delete({ where: { id } });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          },

    }
}