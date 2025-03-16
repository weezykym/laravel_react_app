import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({children}) {

    const[token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    async function getUser() {
        const res = await fetch("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if(res.ok) {
            setUser(data);
        }
    }

    //to call this getUser function whenever the token state changes,
    //it will also be called immedaiately the application loads because it is in the context which wraps entire file
    useEffect(()=>{                                    //this is the callback function that is run anytime token changes!
        if (token) {
            getUser();
        }
    }, [token])

    return (
    <AppContext.Provider value={{token, setToken, user, setUser}}>
        {children}
    </AppContext.Provider>
    )
}
