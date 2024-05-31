import { PrismaClient, User } from "@prisma/client";
import { handlePrismaError } from "../../utils/requests-handler";
import { Response } from "express";

const prisma = new PrismaClient();

interface CreateUserArgs {
  username?: string;
  email: string;
  password: string;
}

interface UpdateUserArgs extends CreateUserArgs {
  id: string;
}

interface DeleteUserArgs {
  id: string;
}

export const userResolvers = {
  Query: {
    users: async (_: any, __: any, { res }: { res: Response }): Promise<User[]> => {
      try {
        return await prisma.user.findMany({ include: {Wallet: true}});
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
    user: async (_: any, { id }: { id: string }, { res }: { res: Response }): Promise<User | null> => {
      try {
        return await prisma.user.findUnique({ where: { id },include: {Wallet: true}});
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
  },
  Mutation: {
    loginUser: async (
      _: any,
      { email, password }: CreateUserArgs,
      { res }: { res: Response }
    ): Promise<User | null> => {
      try {
        return await prisma.user.findFirst({
          where: { email, password },
        });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
    createUser: async (
      _: any,
      { username, email, password }: CreateUserArgs,
      { res }: { res: Response }
    ): Promise<User> => {
      try {
        const user = await prisma.user.create({
          data: { username, email, password },
        });
        await prisma.wallet.create({
          data: {  userId: user.id },
        });
        return user;
      } catch (error) {
        console.log(error)
        return handlePrismaError(error, res);
        // return handlePrismaError(error, res);
      }
    },

    updateUser: async (
      _: any,
      { id, username, email, password }: UpdateUserArgs,
      { res }: { res: Response }
    ): Promise<User | null> => {
      try {
        return await prisma.user.update({
          where: { id },
          data: { username, email, password },
        });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },

    deleteUser: async (
      _: any,
      { id }: DeleteUserArgs,
      { res }: { res: Response }
    ): Promise<User | null> => {
      try {
        await prisma.wallet.delete({ where: { userId: id } });
        return await prisma.user.delete({ where: { id } });
      } catch (error) {
        return handlePrismaError(error, res);
      }
    },
  },
};
