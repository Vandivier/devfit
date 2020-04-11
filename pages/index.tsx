// import { NextPage } from "next";
// import Head from "next/head";

// type HomeProps = {};

// const Home: NextPage<HomeProps> = () => (
//   <div>
//     <Head>
//       <title>DevFit</title>
//     </Head>

//     <h1>asdf</h1>
//   </div>
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
