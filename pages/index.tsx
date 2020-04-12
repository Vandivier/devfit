import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { LeaderboardPage, UserPoints } from '../components/Leaderboard/LeaderboardPage';
import { loadFeed } from '../utils/loadFeed';

export function getStaticProps() {
    return loadFeed();
}

const Home = ({ data }: { data: UserPoints[] }) => (
    <MainLayout>
        {/* <HomePage /> */}
        <LeaderboardPage data={data} />
    </MainLayout>
);

export default Home;
