import { Credit, CreditType, PrismaClient, User, Wallet } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";

const prisma = new PrismaClient();

interface UpdateWalletArgs {
  balance: number;
  email: string;
}

interface DeleteWalletArgs {
  id: string;
}

export const walletResolvers = {
  Query: {
    wallet: async (
      _: any,
      { userId, res }: { userId: string; res: Response }
    ): Promise<Wallet | null> => {
      try {
        return await prisma.wallet.findUnique({ where: { userId } });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
    walletByEmail: async (
      _: any,
      { email }: { email: string },
      { res }: { res: Response }
    ): Promise<Wallet | null> => {
      try {
        console.log(email, "Wallet");
        const user = await prisma.user.findUnique({
          where: { email },
          include: { Wallet: true },
        });

        return user?.Wallet || null;
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
  },
  Mutation: {
    updateWallet: async (
      _: any,
      { balance, email }: UpdateWalletArgs,
      { res }: { res: Response }
    ): Promise<Wallet> => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if(!user) {
          throw new Error("User not found");
        }
        return await prisma.wallet.update({
          where: { 
            userId: user.id
           },
          data: { balance },
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
  },
};
