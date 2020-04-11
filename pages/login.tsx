import { NextPage } from 'next';
import MainLayout from '../Components/MainLayout';
import { LoginPage } from '../Components/Login/LoginPage';

type HomeProps = {}

const Login: NextPage<HomeProps> = () => (
	<MainLayout>
		<LoginPage />
	</MainLayout>
);
  
export default Login;