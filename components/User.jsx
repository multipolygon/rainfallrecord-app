import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext([null, () => null]);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const src = `${process.env.API_HOST}/user.json`;

    useEffect(() => {
        if (user === null) {
            if (window && typeof window === 'object') {
                window
                    .fetch(src, { credentials: 'include' })
                    .then((response) => {
                        if (response.ok) {
                            response.json().then((obj) => {
                                if (obj && typeof obj === 'object') {
                                    setUser(obj);
                                } else {
                                    setUser(false);
                                }
                            });
                        } else if (response.status === 403) {
                            // not logged in
                            setUser({});
                        } else {
                            setUser(false);
                        }
                    })
                    .catch(() => setUser(false));
            } else {
                setUser({});
            }
        }
    }, [user]);

    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
