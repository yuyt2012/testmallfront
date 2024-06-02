// src/components/useLocation.jsx
import { useState, useEffect } from 'react';

export const useLocation = () => {
    const [location, setLocation] = useState(window.location.href);

    useEffect(() => {
        const handleLocationChange = () => {
            setLocation(window.location.href);
        };

        window.addEventListener('popstate', handleLocationChange);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    return location;
};