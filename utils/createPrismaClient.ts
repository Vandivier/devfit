import { PrismaClient } from "@prisma/client";
import { MockPrismaClient } from "./mock-prisma";

export const createPrismaClient = () => {
  return process.env.NODE_ENV as string === 'mock-prisma' ? new MockPrismaClient() : new PrismaClient({
    log: ["info", "warn", "query"],
  });
};
