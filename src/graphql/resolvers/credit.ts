import { Credit, CreditType, PrismaClient, User } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";

const prisma = new PrismaClient();

interface UpdateCreditArgs{
  email: string;
  type: CreditType;
  credits: number;
}

interface DeleteCreditArgs {
  id: string;
}

export const creditResolvers = {
    Query:{
        credit: async (_: any, { email, res }: { email: string, res: Response }): Promise<Credit[]> => {
            try {
              const user = await prisma.user.findUnique({ where: { email } });

              if (!user) {
                throw new Error("User not found");
              }

              return await prisma.credit.findMany({ where: { userId:  user.id } });
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
            { credits, type, email }: UpdateCreditArgs,
            { res }: { res: Response }
          ): Promise<Credit> => {
            try {
              const user = await prisma.user.findUnique({ where: { email } });
              if (!user) {
                throw new Error("User not found");
              }
              return await prisma.credit.create({
                data: { credits, type, userId: user.id },
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