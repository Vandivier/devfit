import { NextApiRequest, NextApiResponse } from 'next';
import { SessionHandler, Context } from './session';

export const isAuth = (handler: SessionHandler) => (req: NextApiRequest, res: NextApiResponse, ctx: Context) => {
    if (!ctx.getUserId()) {
        res.status(400).json({ error: 'not authenticated' });
        return;
    }

    return handler(req, res, ctx);
};
