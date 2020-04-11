import { PrismaClient } from "@prisma/client";

export const createPrismaClient = () => {
  return new PrismaClient({
    log: ["info", "warn", "query"],
  });
};
