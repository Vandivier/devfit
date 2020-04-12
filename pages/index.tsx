import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { HomePage } from '../components/Home/HomePage';
import { LeaderboardPage } from '../components/Leaderboard/LeaderboardPage';

type HomeProps = {}

const Home: NextPage<HomeProps> = () => (
	<MainLayout>
		{/* <HomePage /> */}
		<LeaderboardPage />
	</MainLayout>
);
  
export default Home;