import { NextPage } from 'next';
import MainLayout from '../Components/MainLayout';
import { HomePage } from '../Components/Home/HomePage';

type HomeProps = {}

const Home: NextPage<HomeProps> = () => (
	<MainLayout>
		<HomePage />
	</MainLayout>
);
  
export default Home;