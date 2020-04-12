import React from 'react';
import { CloudinaryUpload } from '../../real-components/CloudinaryUpload';
import { Post } from '@prisma/client';

type FeedPageProps = {
    data: Post[];
};

export const FeedPage: React.FC<FeedPageProps> = ({ data }) => {
    return (
        <div>
            <h1>Feed Page</h1>
            <NewChallenge />
            <CloudinaryUpload />
            <div>{JSON.stringify(data)}</div>
        </div>
    );
};

type NewChallengeProps = {}

const NewChallenge: React.FC<NewChallengeProps> = () => {
    return (
        <div>
            <p>Challenge</p>      
        </div>
    );
}