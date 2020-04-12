import { createPrismaClient } from '../../../utils/createPrismaClient';
import { SessionHandler, session } from '../../../middleware/session';
import { isAuth } from '../../../middleware/isAuth';

const prisma = createPrismaClient();
const handler: SessionHandler = async (req, res, { getUserId }) => {
    const userId = getUserId();

    const result = await prisma.post.create({
        data: {
            ...req.body,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    res.status(200).json(result);
    return;
};

export default session(isAuth(handler));
