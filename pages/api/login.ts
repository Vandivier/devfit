import { SessionHandler, session } from "../../middleware/session";
import { createPrismaClient } from "../../utils/createPrismaClient";
import { compare } from "bcryptjs";

const prisma = createPrismaClient();
const handler: SessionHandler = async (req, res, { setUserId }) => {
  const { username, password } = req.body;
  const user = await prisma.user.findOne({ where: { username } });
  if (!user) {
    res.status(400).json({ error: "could not find user" });
    return;
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    res.status(400).json({ error: "bad password" });
    return;
  }

  setUserId(user.id);

  res.status(200).json({ ok: true, user });
};

export default session(handler);
