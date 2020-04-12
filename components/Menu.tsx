/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import React from 'react';
import { useRouter } from 'next/router';

import { useAuthenticated } from './useAuthenticated';

import { Button } from 'semantic-ui-react';

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
    }
}

type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {

    const router = useRouter();
    const { isAuthenticated, userDetails } = useAuthenticated();

    return (
        <div css={menuStyles.parentDiv}>
            <div css={menuStyles.LogoDiv}>
                <p onClick={() => router.push('/')}>Dev Fit</p>
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