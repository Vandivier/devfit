import React, { Fragment, useState, useEffect } from 'react';
import { Container, Loader, Feed, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useAuthenticated } from '../useAuthenticated';

export type UserPoints = {
    id: string;
    username: string;
    points: number;
};

type LeaderboardPageProps = {
    data: UserPoints[];
};

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ data }) => {
    const [leaderboardItemsData, setLeaderboardItemsData] = useState<UserPoints[] | undefined>(undefined);

    const { isAuthenticated } = useAuthenticated();
    const router = useRouter();

    useEffect(() => {
        setLeaderboardItemsData(data);
    }, [data]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Leaderboard Page</h1>

            { isAuthenticated ? 
                <Button onClick={() => router.push('/feed')} fluid primary>Complete Your Next Challenge</Button>
            :
                <Button onClick={() => router.push('/register')} fluid primary>Get Started</Button>
            }

            {!leaderboardItemsData && (
                <div>
                    <Loader active inline="centered" />
                </div>
            )}

            {leaderboardItemsData && (
                <Container>
                    <Feed size="large">
                        {leaderboardItemsData.map((item, index) => {
                            return (
                                <Fragment key={`leaderboardItem${index}`}>
                                    <LeaderboardItemComp leaderboardItem={item} />
                                </Fragment>
                            );
                        })}
                    </Feed>
                </Container>
            )}
        </div>
    );
};

type LeaderboardItemProps = {
    leaderboardItem: UserPoints;
};

const LeaderboardItemComp: React.FC<LeaderboardItemProps> = ({ leaderboardItem }) => {
    const { username, points } = leaderboardItem;

    return (
        <Feed.Event>
            <Feed.Label icon="user secret" style={{ display: 'flex', alignItems: 'center' }} />
            <Feed.Content>
                <Feed.Summary>
                    {username}
                    <Feed.Date>{points} Points</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                    <Feed.User>Visit Profile</Feed.User>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    );
};
