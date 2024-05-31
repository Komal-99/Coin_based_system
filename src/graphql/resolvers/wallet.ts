import { Credit, CreditType, PrismaClient, User, Wallet } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";

const prisma = new PrismaClient();

interface UpdateWalletArgs{
 
    balance: number;
    userId: string;
}

interface DeleteWalletArgs {
  id: string;
}

export const walletResolvers = {
    Query:{
        wallet: async (_: any, { userId, res }: { userId: string, res: Response }): Promise<Wallet|null> => {
            try {
              return await prisma.wallet.findUnique({ where: { userId } });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          }
    },
    Mutation:{
        updateWallet: async (
            _: any,
            { balance, userId }: UpdateWalletArgs,
            { res }: { res: Response }
          ): Promise<Wallet> => {
            try {
              return await prisma.wallet.update({where: {userId}, data: { balance }
              });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          },
          deleteWallet: async (
            _: any,
            { id }: DeleteWalletArgs,
            { res }: { res: Response }
          ): Promise<Wallet | null> => {
            try {
              return await prisma.wallet.delete({ where: { id } });
            } catch (error) {
              return handlePrismaError(error, res);
            }
          },
    }
}