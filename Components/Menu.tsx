/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import React from 'react';
import { useRouter } from 'next/router';

import { Button } from 'semantic-ui-react';

type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {

    const router = useRouter();

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

    return (
        <div css={menuStyles.parentDiv}>
            <div css={menuStyles.LogoDiv}>
                <p onClick={() => router.push('/')}>Dev Fit</p>
            </div>

            <div css={menuStyles.actionsDiv}>
                <Button onClick={() => router.push('/login')}>Log In</Button>
                <Button onClick={() => router.push('/register')} primary>Sign Up</Button>
            </div>
        </div>
    )
}