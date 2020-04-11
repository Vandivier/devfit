import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {

    const router = useRouter();

    return (
        <div>
            <Link href='/'>
                <p>home</p>
            </Link>

            <Link href='/feed'>
                <p>feed</p>
            </Link>

            <Link href='/leaderboard'>
                <p>leaderboard</p>
            </Link>

            <Link href='/login'>
                <p>login</p>
            </Link>

            <Link href='/profile'>
                <p>profile</p>
            </Link>
            
            <Link href='/register'>
                <p>register</p>
            </Link>
        </div>
    )
}