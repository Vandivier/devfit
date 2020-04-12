import { useEffect, useState } from 'react';

import { User } from '@prisma/client';
import { useLogin } from '../real-components/useLogin';
import { useLogout } from '../real-components/useLogout';

export const useAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<User | undefined>(undefined);
    const { loginData } = useLogin<{ user: User }>('/me');
    const { logoutData, logout } = useLogout<{ isLoggedOut: boolean }>('/logout');

    useEffect(() => {
        if (logoutData.isLoggedOut) {
            setIsAuthenticated(false);
        } else if (loginData) {
            setIsAuthenticated(!!loginData.user);
            if (!!loginData.user) {
                setUserDetails(loginData.user);
            }
        }
    }, [loginData, logoutData]);

    return { isAuthenticated, userDetails, logout };
};
