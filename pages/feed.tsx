import MainLayout from '../components/MainLayout';
import { createPrismaClient } from '../utils/createPrismaClient';
import { Post } from '@prisma/client';

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
        <div>{JSON.stringify(data)}</div>
    </MainLayout>
);

export default Feed;
