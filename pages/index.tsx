import { NextPage } from 'next';
import Head from 'next/head'

type HomeProps = {}

const Home: NextPage<HomeProps> = () => (
	<div>
		<Head>
			<title>DevFit</title>
		</Head>

		<h1>HomePage</h1>
	</div>
);
  
export default Home
