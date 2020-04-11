import DefaultHead from './DefaultHead';
import { Menu } from './Menu';

type MainLayoutProps = {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
	<div>
		<DefaultHead />
		<Menu />

        {children}
	</div>
);
  
export default MainLayout;