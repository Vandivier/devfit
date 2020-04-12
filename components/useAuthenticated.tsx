import { useEffect, useState } from 'react';

import { useGetter } from '../real-components/useGetter';
import { User } from '@prisma/client';

export const useAuthenticated = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { data, loading } = useGetter<{ user: User }>('/me');

    useEffect(() => {
        if (data) {
            setIsAuthenticated(!!data.user);
        }
    }, [data]);

    return { isAuthenticated };
}