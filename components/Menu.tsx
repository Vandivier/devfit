/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import React from 'react';
import { useRouter } from 'next/router';

import { useAuthenticated } from './useAuthenticated';

import { Button, Icon } from 'semantic-ui-react';

const menuStyles = {
    parentDiv: {
        padding: '5px 0',
        display: 'flex',
        flexDirection: 'row' as 'row',
    },
    LogoDiv: {
        padding: '0 5px',
        flex: 1,
    },
    actionsDiv:{ 
        padding: '0 5px',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    LogoChildDiv: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            opacity: 0.7,
            cursor: 'pointer'
        }
    }
}

type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {

    const router = useRouter();
    const { isAuthenticated, userDetails } = useAuthenticated();

    return (
        <div css={menuStyles.parentDiv}>
            <div css={menuStyles.LogoDiv}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                    <div css={menuStyles.LogoChildDiv} onClick={() => router.push('/')}>
                        <Icon name='weight' size='large' style={{margin: 0}} />
                        <h2 style={{margin: 0}}>DevFit</h2>
                    </div>

                </div>
            </div>

            {isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}

        </div>
    )
}

type UnAuthenticatedMenuProps = {}

const UnAuthenticatedMenu: React.FC<UnAuthenticatedMenuProps> = () => {

    const router = useRouter();

    return (
        <div css={menuStyles.actionsDiv}>
            <Button onClick={() => router.push('/login')}>Log In</Button>
            <Button onClick={() => router.push('/register')} primary>Sign Up</Button>
        </div>
    )
}

type AuthenticatedMenuProps = {}

const AuthenticatedMenu: React.FC<AuthenticatedMenuProps> = () => {

    const router = useRouter();

    return (
        <div css={menuStyles.actionsDiv}>
            <Button onClick={() => router.push('/logout')}>Sign Out</Button>
        </div>
    )
}