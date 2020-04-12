import { SessionHandler, session } from "../../middleware/session";
import { createPrismaClient } from "../../utils/createPrismaClient";

const prisma = createPrismaClient();
const handler: SessionHandler = async (req, res, { getUserId }) => {
  const userId = getUserId();
  res.status(200).json({
    user: !userId
      ? null
      : await prisma.user.findOne({ where: { id: getUserId() } }),
  });
};

export default session(handler, "GET");
