import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { RegisterPage } from '../components/Register/RegisterPage';

type RegisterProps = {};

const Register: NextPage<RegisterProps> = () => (
    <MainLayout>
        <RegisterPage />
    </MainLayout>
);

export default Register;
