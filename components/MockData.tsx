export type Tag = {
    id: number;
    name: string;
}

export const tagsList = [
    { id: 1, name: 'Angular Dev' },
    { id: 2, name: 'React Dev' },
    { id: 3, name: 'Typescript Man' },
    { id: 4, name: 'Some other tag' }
]

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
