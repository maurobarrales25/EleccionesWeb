import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [ ciudadano, setCiudadano ] = useState(null)

    return (
        <UserContext.Provider value={{ciudadano, setCiudadano}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)