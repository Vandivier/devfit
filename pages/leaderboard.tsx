import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import {
  LeaderboardPage,
  UserPoints,
} from '../components/Leaderboard/LeaderboardPage';
import { createPrismaClient } from '../utils/createPrismaClient';

export async function getStaticProps() {
  const prisma = createPrismaClient();
  console.log('here...');
  // const stuff = await prisma.user.create({
  //   data: {
  //     username: 'bohb',
  //     password: 'qqq',
  //     posts: {
  //       create: {
  //         caption: 'stuff',
  //         challenge: {
  //           create: {
  //             basePointValue: 5,
  //             maxPoints: 5,
  //             name: 'pushup',
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  const data = await prisma.raw(`
  select u.id, u.username, sum(C."basePointValue") points from "User" u
 inner join "Post" P on U.id = P."userId"
 inner join "Challenge" C on P."challengeId" = C.id
 group by u.id
 order by points
  `);
  console.log(data);
  // const songs = await prisma.song.findMany({
  //   include: { artist: true }
  // });

  return {
    props: {
      data,
    },
  };
}

const Leaderboard = ({ data }: { data: UserPoints[] }) => (
  <MainLayout>
    <LeaderboardPage data={data} />
  </MainLayout>
);

export default Leaderboard;
