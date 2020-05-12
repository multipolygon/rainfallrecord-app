import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext([null, () => null]);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const src = `http://api.rainfallrecord.localhost/user.json`;

    useEffect(() => {
        if (user === null && typeof window === 'object') {
            window.fetch(src, { credentials: 'include' }).then((response) => {
                if (response.ok) {
                    response.json().then((obj) => {
                        if (typeof obj === 'object' && typeof obj.username === 'string') {
                            setUser(obj);
                        } else {
                            setUser(null);
                        }
                    });
                } else {
                    setUser(null);
                }
            });
        }
    }, []);

    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
