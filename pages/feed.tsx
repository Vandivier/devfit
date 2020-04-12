import MainLayout from '../components/MainLayout';
import { createPrismaClient } from '../utils/createPrismaClient';
import { Post, PostSelect } from '@prisma/client';
import { FeedPage } from '../components/Feed/FeedPage';
import { PostWithStuff } from '../utils/PostWithStuff';

export async function getStaticProps() {
    const prisma = createPrismaClient();
    const data = await prisma.post.findMany({
        first: 20,
        include: {
            challenge: true,
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return {
        props: {
            data: data.map((x) => ({ ...x, createdAt: x.createdAt.toString() })),
        },
    };
}

const Feed = ({ data }: { data: PostWithStuff[] }) => (
    <MainLayout>
        <FeedPage data={data} />
    </MainLayout>
);

export default Feed;
