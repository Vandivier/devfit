import MainLayout from '../components/MainLayout';
import { LeaderboardPage, UserPoints } from '../components/Leaderboard/LeaderboardPage';
import { loadFeed } from '../utils/loadFeed';

export function getStaticProps() {
    return loadFeed();
}

const Leaderboard = ({ data }: { data: UserPoints[] }) => (
    <MainLayout>
        <LeaderboardPage data={data} />
    </MainLayout>
);

export default Leaderboard;
