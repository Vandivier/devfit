import { Post, Challenge, User } from '@prisma/client';

export type PostWithStuff = {
    challenge: Challenge;
    user: User;
} & Post;
