// import { NextPage } from 'next';
// import MainLayout from '../components/MainLayout';
// import { HomePage } from '../components/Home/HomePage';

// type HomeProps = {}

// const Home: NextPage<HomeProps> = () => (
// 	<MainLayout>
// 		<HomePage />
// 	</MainLayout>
// );

// export default Home;

import getLoggedInUser from "../lib/getLoggedInUser";
import HomePage from "../components/HomePage";
import MainPage from "../components/MainPage";

const IndexPage = ({ loggedInUser }: any) => {
  return loggedInUser ? <MainPage /> : <HomePage />;
};

IndexPage.getInitialProps = async (context: any) => {
  const loggedInUser = await getLoggedInUser(context.apolloClient);
  return { loggedInUser };
};

export default IndexPage;
