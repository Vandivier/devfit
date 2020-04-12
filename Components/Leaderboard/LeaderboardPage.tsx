import React, { Fragment, useState, useEffect } from 'react';

import { leaderboardItems, LeaderboardItem } from '../MockData';
import { Container, Loader, Feed } from 'semantic-ui-react';

export type UserPoints = {
  id: string;
  username: string;
  points: number;
};

type LeaderboardPageProps = {
  data: UserPoints[];
};

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ data }) => {
  const [leaderboardItemsData, setLeaderboardItemsData] = useState<
    UserPoints[] | undefined
  >(undefined);

  useEffect(() => {
    console.log('setting data...', data);
    setLeaderboardItemsData(data);
  }, [data]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Leaderboard Page</h1>

      {!leaderboardItemsData && (
        <div>
          <Loader active inline="centered" />
        </div>
      )}

      {leaderboardItemsData && (
        <Container>
          <Feed size="large">
            {leaderboardItemsData.map((item, index) => {
              console.log('item', item);
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

const LeaderboardItemComp: React.FC<LeaderboardItemProps> = ({
  leaderboardItem,
}) => {
  const { username, points } = leaderboardItem;

  return (
    <Feed.Event>
      <Feed.Label
        icon="user secret"
        style={{ display: 'flex', alignItems: 'center' }}
      />
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
