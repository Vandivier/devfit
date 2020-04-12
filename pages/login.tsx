import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { LoginPage } from '../components/Login/LoginPage';

type HomeProps = {};

const Login: NextPage<HomeProps> = () => (
  <MainLayout>
    <LoginPage />
  </MainLayout>
);

export default Login;
