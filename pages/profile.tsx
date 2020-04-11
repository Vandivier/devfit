import { NextPage } from 'next';
import MainLayout from '../Components/MainLayout';
import { ProfilePage } from '../Components/Profile/ProfilePage';

type ProfileProps = {}

const Profile: NextPage<ProfileProps> = () => (
	<MainLayout>
		<ProfilePage />
	</MainLayout>
);
  
export default Profile;