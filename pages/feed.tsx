import { NextPage } from 'next';
import MainLayout from '../Components/MainLayout';
import { FeedPage } from '../Components/Feed/FeedPage';

type FeedProps = {}

const Feed: NextPage<FeedProps> = () => (
	<MainLayout>
		<FeedPage />
	</MainLayout>
);
  
export default Feed;