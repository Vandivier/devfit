/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import React from 'react';
import { createPrismaClient } from '../../utils/createPrismaClient';
import { useGetter } from '../../real-components/useGetter';
import { User, Post } from '@prisma/client';

import { Card, Icon, Image, Feed } from 'semantic-ui-react';

type ProfilePageProps = {};

export const ProfilePage: React.FC<ProfilePageProps> = () => {
    const { data, loading } = useGetter<{ user: User }>('/me');

    const profileStyles = {
        parentDiv: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column' as 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    return (
        <div css={profileStyles.parentDiv}>
            <h1>Profile Page</h1>
            <Card>
                {/* TODO: Attach user profile picture to image */}
                {/* <Image src={data?.user.profile ? data.user.profile : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} wrapped ui={false} /> */}
                <Image src={'https://react.semantic-ui.com/images/avatar/large/matthew.png'} wrapped ui={false} />
                
                <Card.Content>
                    <Card.Header>{data?.user.username}</Card.Header>
                    {/* TODO: Add actual rank */}
                    <Card.Meta>Rank 31313</Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    {/* TODO: Allow user to upload photo */}
                    <a>Update profile picture</a>
                </Card.Content>
            </Card>

            {/* TODO: Populate a list of their posts */}
            <ProfilePosts posts={undefined} />
        </div>
    );
};

type ProfilePostsProps = {
    posts: Post[];
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
    
    if (!posts) {
        return (
            <p>No posts.</p>
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