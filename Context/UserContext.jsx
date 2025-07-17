import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token!== null) {
            setUser(token);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}
