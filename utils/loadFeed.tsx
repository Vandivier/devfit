import { createPrismaClient } from './createPrismaClient';
export async function loadFeed() {
    const prisma = createPrismaClient();
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
 order by points desc
  `);
    // const songs = await prisma.song.findMany({
    //   include: { artist: true }
    // });
    return {
        props: {
            data,
        },
    };
}
