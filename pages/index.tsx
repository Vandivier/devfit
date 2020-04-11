import { NextPage } from 'next';
import DefaultHead from '../Components/DefaultHead';

import { Menu } from '../Components/Menu';

type HomeProps = {}

const Home: NextPage<HomeProps> = () => (
	<div>
		<DefaultHead />

		<Menu />
		<h1>HomePage123</h1>
	</div>
);
  
export default Home;