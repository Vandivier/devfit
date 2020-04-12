import { SessionHandler, session } from '../../middleware/session';
import { createPrismaClient } from '../../utils/createPrismaClient';

const prisma = createPrismaClient();
const handler: SessionHandler = async (req, res, { getUserId }) => {
    const userId = getUserId();
    if (!userId) {
        res.status(200).json({
            user: undefined,
        });
        return;
    }
    const pUser = prisma.user.findOne({
        where: { id: getUserId() },
        include: {
            posts: true,
        },
    });
    const pp = prisma.raw(`
    select sum(C."basePointValue") points from "User" u
   inner join "Post" P on U.id = P."userId"
   inner join "Challenge" C on P."challengeId" = C.id
   where u.id = ${userId}
    `);
    const [user, [{ points }]] = await Promise.all([pUser, pp]);
    res.status(200).json({
        user: {
            ...user,
            points: points || 0,
        },
    });
};

export default session(handler, 'GET');
