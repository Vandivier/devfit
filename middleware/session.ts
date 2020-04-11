import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const cookieName = "qid";

export const session = (
  handler: (req: NextApiRequest, res: NextApiResponse, x: any) => Promise<void>
) => (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res, {
    getUserId: () => {
      return req.cookies.userId;
    },
    setUserId: (userId: string) => {
      res.setHeader(
        "Set-Cookie",
        serialize(cookieName, userId, {
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
  x: any
) => Promise<void>;
