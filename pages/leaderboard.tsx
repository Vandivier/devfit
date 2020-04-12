import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { LeaderboardPage } from '../components/Leaderboard/LeaderboardPage';

type HomeProps = {};

const Leaderboard: NextPage<HomeProps> = () => (
  <MainLayout>
    <LeaderboardPage />
  </MainLayout>
);

export default Leaderboard;
