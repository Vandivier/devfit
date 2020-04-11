import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { HomePage } from '../components/Home/HomePage';

type HomeProps = {}

const Home: NextPage<HomeProps> = () => (
	<MainLayout>
		<HomePage />
	</MainLayout>
);
  
export default Home;