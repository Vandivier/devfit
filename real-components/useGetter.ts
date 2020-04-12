import { useState, useEffect } from 'react';

export const useGetter = <T = any>(path: string): { data: T | null; loading: boolean } => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api' + path)
            .then((x) => x.json())
            .then((x) => {
                setData(x);
                setLoading(false);
            });
    }, [path]);

    return { data, loading };
};
