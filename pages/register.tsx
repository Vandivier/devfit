import { NextPage } from 'next';
import MainLayout from '../Components/MainLayout';
import { RegisterPage } from '../Components/Register/RegisterPage';

type RegisterProps = {}

const Register: NextPage<RegisterProps> = () => (
	<MainLayout>
		<RegisterPage />
	</MainLayout>
);
  
export default Register;