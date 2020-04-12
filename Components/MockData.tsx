export type User = {
  id: number;
  username: string;
  tags: string[];
};

export type Challenge = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  user: User;
  challenge: Challenge;
  createdAt: Date;
  likes: number;
  caption?: string;
  videoUrl?: string;
};

export const postItems: Post[] = [
  {
    id: 1,
    user: { id: 1, username: 'johnsmith', tags: ['tag1, tag2'] },
    challenge: { id: 1, name: 'Push Ups' },
    createdAt: new Date(),
    likes: 10,
  },
  {
    id: 2,
    user: { id: 1, username: 'jackjill', tags: ['tag1, tag2'] },
    challenge: { id: 2, name: 'Push Ups' },
    createdAt: new Date(),
    likes: 42,
  },
  {
    id: 3,
    user: { id: 1, username: 'johnny', tags: ['tag1, tag2'] },
    challenge: { id: 3, name: 'Push Ups' },
    createdAt: new Date(),
    likes: 51,
  },
  {
    id: 4,
    user: { id: 1, username: 'quill', tags: ['tag1, tag2'] },
    challenge: { id: 4, name: 'Push Ups' },
    createdAt: new Date(),
    likes: 645,
  },
];

export type LeaderboardItem = {
  name: string;
  avatar: string;
  rank: number;
  points: number;
};

export const leaderboardItems: LeaderboardItem[] = [
  { name: 'John Smith', avatar: '', rank: 123, points: 9999 },
  { name: 'John Smith', avatar: '', rank: 123, points: 9999 },
  { name: 'John Smith', avatar: '', rank: 123, points: 9999 },
  { name: 'John Smith', avatar: '', rank: 123, points: 9999 },
  { name: 'John Smith', avatar: '', rank: 123, points: 9999 },
  { name: 'John Smith', avatar: '', rank: 123, points: 9999 },
];
