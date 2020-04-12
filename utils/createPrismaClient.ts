import { PrismaClient } from '@prisma/client';
import { MockPrismaClient } from './mock-prisma';

export const createPrismaClient = () => {
    return new PrismaClient({
        // log: ["info", "warn", "query"],
    });
};
