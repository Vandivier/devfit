import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const cookieName = 'qid';

export const session = (handler: SessionHandler, type: 'GET' | 'POST' = 'POST') => (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== type) {
        res.status(405).json({ error: 'bad' });
    }

    return handler(req, res, {
        getUserId: () => {
            return req.cookies[cookieName] ? parseInt(req.cookies[cookieName]) : undefined;
        },
        setUserId: (userId) => {
            res.setHeader(
                'Set-Cookie',
                serialize(cookieName, '' + userId, {
                    maxAge: 60 * 60 * 24 * 365,
                    secure: false,
                    sameSite: 'lax',
                    httpOnly: false,
                })
            );
        },
    });
};

export type Context = {
    setUserId: (userId: number) => void;
    getUserId: () => number | undefined;
};

export type SessionHandler = (req: NextApiRequest, res: NextApiResponse, x: Context) => Promise<any>;
