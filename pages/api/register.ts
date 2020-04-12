import { createPrismaClient } from '../../utils/createPrismaClient';
import { hash } from 'bcryptjs';
import * as yup from 'yup';
import { session, SessionHandler } from '../../middleware/session';
import { Tag } from '@prisma/client';

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

const prisma = createPrismaClient();
const handler: SessionHandler = async (req, res, { setUserId }) => {
  try {
    await schema.validate(req.body, { strict: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'invalid input' });
    return;
  }

  const { username, password, tagIds, newTags } = req.body;
  // console.log("body: ", typeof req.body);
  // console.log("body2: ", JSON.parse(req.body));
  // console.log("username: ", req.body.username);
  if (await prisma.user.findOne({ where: { username } })) {
    res.status(400).json({ error: 'username already exists' });
    return;
  }

  const hashedPassword = await hash(password, 8);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      tags:
        !tagIds.length && !newTags.length
          ? undefined
          : {
              connect: !tagIds.length
                ? undefined
                : tagIds.map((id: string) => ({
                    id,
                  })),
              create: !newTags.length
                ? undefined
                : newTags.map((tag: Tag) => tag),
            },
    },
  });

  setUserId(user.id);

  res.status(200).json({ ok: true, user });
};

export default session(handler);
