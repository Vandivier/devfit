import { NextPage } from 'next';
import MainLayout from '../Components/MainLayout';
import { LeaderboardPage } from '../Components/Leaderboard/LeaderboardPage';

type HomeProps = {}

const Leaderboard: NextPage<HomeProps> = () => (
	<MainLayout>
		<LeaderboardPage />
	</MainLayout>
);
  
export default Leaderboard;