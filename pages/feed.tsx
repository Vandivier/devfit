import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { FeedPage } from '../components/Feed/FeedPage';

type FeedProps = {};

const Feed: NextPage<FeedProps> = () => (
  <MainLayout>
    <FeedPage />
  </MainLayout>
);

export default Feed;
