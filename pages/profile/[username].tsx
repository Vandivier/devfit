/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import React from 'react';
import MainLayout from '../../components/MainLayout';
import { createPrismaClient } from '../../utils/createPrismaClient';
import { User, Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { Card, Image, Feed, Segment } from 'semantic-ui-react';

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

    const profileStyles = {
        parentDiv: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column' as 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    if (isFallback) {
        return <div style={{height: '100%',}}>loading...</div>;
    }
    return <MainLayout>{data ? 
        <div css={profileStyles.parentDiv}>
            {/* {JSON.stringify(data)} */}
            <Segment style={{width: '100%', display: 'flex', flexDirection: 'column' as 'column', alignItems: 'center'}}>
                <Card>
                    {/* TODO: Attach user profile picture to image */}
                    {/* <Image src={data?.user.profile ? data.user.profile : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} wrapped ui={false} /> */}
                    <Image src={'https://react.semantic-ui.com/images/avatar/large/matthew.png'} wrapped ui={false} />
                    
                    <Card.Content>
                        <Card.Header>{data?.username}</Card.Header>
                        {/* TODO: Add actual rank */}
                        <Card.Meta>Rank 31313</Card.Meta>
                    </Card.Content>
                </Card>

                {/* TODO: Populate a list of their posts */}
                <ProfilePosts posts={undefined} />
            </Segment>
        </div> 
    
    : <div>could not find user</div>}</MainLayout>;
};

export default LookupProfile;

type ProfilePostsProps = {
    posts: Post[];
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
    
    if (!posts) {
        return (
            <p>No posts to show.</p>
        );
    }

    return (
        <Feed>
            {posts.map((post: Post) => (
                <Feed.Event key={post.id}>
                    <Feed.Content>
                        <Feed.Summary>
                            Challenge completed: {post.challengeId}
                            <Feed.Date>{post.createdAt}</Feed.Date>
                        </Feed.Summary>
                        
                        {post.videoUrl &&
                            <Feed.Extra text>
                                {post.videoUrl}
                                {post.caption}
                            </Feed.Extra>
                        }

                        <Feed.Meta>
                            {/* TODO: Replace with actual number of likes */}
                            14 likes
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>
            ))}
        </Feed>  
    );
}