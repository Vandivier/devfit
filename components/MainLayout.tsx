/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import DefaultHead from './DefaultHead';
import { Menu } from './Menu';

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const mainLayoutStyles = {
        parentDiv: {
            minHeight: '100vh',
            maxWidth: '100vw',
            fontFamily: 'Roboto'
        },
        childDiv: {
            padding: '0 10px',
        },
    };

    return (
        <div css={mainLayoutStyles.parentDiv}>
            <DefaultHead />
            <Menu />

            <div css={mainLayoutStyles.childDiv}>{children}</div>
        </div>
    );
};

export default MainLayout;
