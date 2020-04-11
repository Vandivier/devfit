/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import DefaultHead from './DefaultHead';
import { Menu } from './Menu';

type MainLayoutProps = {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const mainLayoutStyles = {
		parentDiv: {
			minHeight: '100vh',
			maxWidth: '100vw'
		}
	}

	return (
		<div css={mainLayoutStyles.parentDiv}>
			<DefaultHead />
			<Menu />

			{children}
		</div>		
	)
};
  
export default MainLayout;