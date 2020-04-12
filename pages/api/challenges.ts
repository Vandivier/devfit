import { createPrismaClient } from '../../utils/createPrismaClient';

const prisma = createPrismaClient();
const handler = async (_, res) => {
    res.status(200).json(await prisma.challenge.findMany());
    return;
};

export default handler;
