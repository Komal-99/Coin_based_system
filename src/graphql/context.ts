import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export interface MyContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}

export const context = async ({ req, res }: { req: Request, res: Response }): Promise<MyContext> => {
  return { req, res, prisma };
};
