import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const cookieName = "qid";

export const session = (handler: SessionHandler) => (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "bad" });
  }

  return handler(req, res, {
    getUserId: () => {
      return req.cookies.userId ? parseInt(req.cookies.userId) : undefined;
    },
    setUserId: (userId) => {
      res.setHeader(
        "Set-Cookie",
        serialize(cookieName, "" + userId, {
          maxAge: 60 * 60 * 24 * 365,
          secure: false,
          sameSite: "lax",
          httpOnly: false,
        })
      );
    },
  });
};

export type SessionHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  x: {
    setUserId: (userId: number) => void;
    getUserId: () => number | undefined;
  }
) => Promise<void>;
