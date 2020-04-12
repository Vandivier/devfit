import { useState, useEffect } from 'react';

export const useLogin = <T = any>(path: string): { loginData: T | null; loading: boolean } => {
    const [loginData, setLoginData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api' + path)
            .then((x) => x.json())
            .then((x) => {
                setLoginData(x);
                setLoading(false);
            });
    }, [path]);

    return { loginData, loading };
};
