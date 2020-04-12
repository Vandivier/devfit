import { PrismaClient } from '@prisma/client';
import { MockPrismaClient } from './mock-prisma';

export const createPrismaClient = () => {
    return (process.env.NODE_ENV as string) === 'mock-prisma'
        ? (new MockPrismaClient() as any)
        : new PrismaClient({
              // log: ["info", "warn", "query"],
          });
};
