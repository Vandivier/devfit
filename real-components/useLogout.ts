import { useState, useEffect } from 'react';

export const useLogout = <T = any>(path: string): { logoutData: T | any; logout: () => void } => {
    const [logoutData, setLogoutData] = useState({});
    // const [loading, setLoading] = useState(true);
    let shouldLogout = false;

    const logout = () => {
        shouldLogout = true;
    }

    useEffect(() => {
        if (shouldLogout) {
            fetch('/api' + path)
            .then((x) => x.json())
            .then((x) => {
                setLogoutData(x);
                // setLoading(false);
            });
        }
    }, [path, shouldLogout]);

    return { logoutData, logout };
};
