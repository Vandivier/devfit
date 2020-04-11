import { NextPage } from "next";
import MainLayout from "../components/MainLayout";
import { ProfilePage } from "../components/Profile/ProfilePage";

type ProfileProps = {};

const Profile: NextPage<ProfileProps> = () => (
  <MainLayout>
    <ProfilePage />
  </MainLayout>
);

export default Profile;
