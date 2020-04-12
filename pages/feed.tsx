import MainLayout from '../components/MainLayout';
import { createPrismaClient } from '../utils/createPrismaClient';
import { Post } from '@prisma/client';
import { FeedPage } from '../components/Feed/FeedPage';

export async function getStaticProps() {
    const prisma = createPrismaClient();
    const data = await prisma.post.findMany({ first: 20 });

    return {
        props: {
            data: data.map((x) => ({ ...x, createdAt: x.createdAt.toString() })),
        },
    };
}

const Feed = ({ data }: { data: Post[] }) => (
    <MainLayout>
        <FeedPage data={data} />
    </MainLayout>
);

export default Feed;
