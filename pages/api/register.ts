import { createPrismaClient } from "../../utils/createPrismaClient";
import { hash } from "bcryptjs";
import * as yup from "yup";
import { Tag } from "@prisma/client";
import { session, SessionHandler } from "../../middleware/session";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  tagIds: yup.array().of(yup.string()),
  newTags: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
    })
  ),
});

const handler: SessionHandler = async (req, res, {}) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "bad" });
  }
  const prisma = createPrismaClient();

  try {
    await schema.validate(req.body);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "invalid input" });
  }

  const { username, password, tagIds, newTags } = req.body;

  if (await prisma.user.findOne({ where: { username } })) {
    res.status(400).json({ error: "username already exists" });
  }

  const hashedPassword = await hash(password, 8);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      tags: {
        connect: tagIds.map((id: string) => ({
          id,
        })),
        create: newTags.map((tag: Tag) => tag),
      },
    },
  });

  // @todo login
};

export default session(handler);
