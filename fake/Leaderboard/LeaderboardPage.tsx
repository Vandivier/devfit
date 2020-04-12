import React, { Fragment, useState, useEffect } from 'react';

import { leaderboardItems, LeaderboardItem } from '../MockData';
import { Container, Loader, Feed } from 'semantic-ui-react';

type LeaderboardPageProps = {}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = () => {

    const [leaderboardItemsData, setLeaderboardItemsData] = useState<LeaderboardItem[] | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setLeaderboardItemsData(leaderboardItems);
        }, 1000);
    }, []);

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Leaderboard Page</h1>

            {!leaderboardItemsData &&
                <div>
                    <Loader
                        active
                        inline='centered'
                    />
                </div>
            }

            {leaderboardItemsData &&
                <Container>
                    <Feed size='large'>
                        {leaderboardItems.map((item: LeaderboardItem, index: number) => (
                            <Fragment key={`leaderboardItem${index}`}>
                                <LeaderboardItemComp leaderboardItem={item} />
                            </Fragment>
                        ))}
                    </Feed>
                </Container>
            }
        </div>
    );
}

type LeaderboardItemProps = {
    leaderboardItem: LeaderboardItem
}

const LeaderboardItemComp: React.FC<LeaderboardItemProps> = ({ leaderboardItem }) => {

    const { name, points } = leaderboardItem;

    return (
        <Feed.Event>
            <Feed.Label icon='user secret' style={{display: 'flex', alignItems: 'center'}} />
            <Feed.Content>
                <Feed.Summary>
                    {name}
                    <Feed.Date>{points} Points</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                    <Feed.User>Visit Profile</Feed.User>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    );
}