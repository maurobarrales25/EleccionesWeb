import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [ ciudadano, setCiudadano ] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem("ciudadano")

        if (stored) {
            setCiudadano(JSON.parse(stored))
        }
    },[])

    const login = (data) => {
        setCiudadano(data)
        localStorage.setItem("ciudadano", JSON.stringify(data))
    }

    return (
        <UserContext.Provider value={{ciudadano, login}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)