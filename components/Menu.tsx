/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuthenticated } from './useAuthenticated';

import { Button, Icon } from 'semantic-ui-react';

const menuStyles = {
    parentDiv: {
        padding: '10px 0',
        display: 'flex',
        flexDirection: 'row' as 'row',
    },
    LogoDiv: {
        padding: '0 5px',
        flex: 1,
    },
    actionsDiv: {
        padding: '0 5px',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    LogoChildDiv: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            opacity: 0.7,
            cursor: 'pointer',
        },
    },
};

type MenuProps = {};

export const Menu: React.FC<MenuProps> = () => {
    const router = useRouter();
    const { isAuthenticated, userDetails } = useAuthenticated();

    return (
        <div css={menuStyles.parentDiv} id='menuDiv'>
            <div css={menuStyles.LogoDiv}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                    <div css={menuStyles.LogoChildDiv} onClick={() => router.push('/')}>
                        <Icon name="weight" size="large" style={{ margin: 0 }} />
                        <h2 style={{ margin: 0 }}>DevFit</h2>
                    </div>
                </div>
            </div>

            {isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
        </div>
    );
};

type UnAuthenticatedMenuProps = {};

const UnAuthenticatedMenu: React.FC<UnAuthenticatedMenuProps> = () => {
    const router = useRouter();

    return (
        <div css={menuStyles.actionsDiv}>
            <Button onClick={() => router.push('/login')}>Log In</Button>
            <Button onClick={() => router.push('/register')} primary>
                Sign Up
            </Button>
        </div>
    );
};

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

type AuthenticatedMenuProps = {};

const AuthenticatedMenu: React.FC<AuthenticatedMenuProps> = () => {
    const router = useRouter();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
    
    useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const authMenuStyles = {
        parentDiv: {
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'row' as 'row',
        },
        LogoDiv: {
            padding: '0 5px',
            flex: 1,
        },
        actionsDiv: {
            padding: '0 5px',
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        LogoChildDiv: {
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                opacity: 0.7,
                cursor: 'pointer',
            },
        },
    };

    const authMenuMobileStyles = {
        hamburgerDiv: {
            padding: '0 5px',
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        menuItemsDiv: {
            height: openMobileMenu ? '100%' : '0%',
            width: '100%',
            position: 'absolute' as 'absolute',
            // top: document.getElementById('menuDiv').style.height,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column' as 'column',
            backgroundColor: 'white'
        }
    }

    return (
        windowDimensions.width > 800 ?
            <div css={authMenuStyles.actionsDiv}>
                <Button basic onClick={() => router.push('/profile')}>Profile</Button>
                <Button basic onClick={() => router.push('/feed')}>Feed</Button>
                <Button basic onClick={() => router.push('/leaderboard')}>Leaderboard</Button>
                <Button secondary onClick={() => router.push('/logout')}>Sign Out</Button>
            </div>
        :   
        
            <div css={authMenuMobileStyles.hamburgerDiv} onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                <Icon name='bars' size='big' style={{visibility: openMobileMenu ? 'hidden' : 'visible'}} />
                {openMobileMenu &&
                    <div css={authMenuMobileStyles.menuItemsDiv}>
                        <Icon name='bars' size='big' style={{visibility: openMobileMenu ? 'visible' : 'hidden', alignSelf: 'flex-end', marginBottom: 10}} />
                        <Button basic onClick={() => router.push('/profile')}>Profile</Button>
                        <Button basic onClick={() => router.push('/feed')}>Feed</Button>
                        <Button basic onClick={() => router.push('/leaderboard')}>Leaderboard</Button>
                        <Button secondary onClick={() => router.push('/logout')}>Sign Out</Button>
                    </div>
                }
            </div>
    );
};
