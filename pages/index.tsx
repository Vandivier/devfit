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

// import getLoggedInUser from "../lib/getLoggedInUser";
// import HomePage from "../components/HomePage";
// import MainPage from "../components/MainPage";

// const IndexPage = ({ loggedInUser }: any) => {
//   return loggedInUser ? <MainPage /> : <HomePage />;
// };

// IndexPage.getInitialProps = async (context: any) => {
//   const loggedInUser = await getLoggedInUser(context.apolloClient);
//   return { loggedInUser };
// };

// export default IndexPage;
