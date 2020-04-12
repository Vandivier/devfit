import React from 'react';
import MainLayout from '../../components/MainLayout';
import { createPrismaClient } from '../../utils/createPrismaClient';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';

export async function getStaticProps({ params: { username } }) {
    const prisma = createPrismaClient();
    const data = await prisma.user.findOne({ where: { username } });

    return {
        props: {
            data,
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

const LookupProfile: React.FC<{
    data: User | null;
}> = ({ data }) => {
    const { isFallback } = useRouter();
    if (isFallback) {
        return <div>loading...</div>;
    }
    return <MainLayout>{data ? <div>{JSON.stringify(data)}</div> : <div>could not find user</div>}</MainLayout>;
};

export default LookupProfile;
