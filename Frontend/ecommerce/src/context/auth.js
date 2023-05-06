import { useState,useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    })

    // default axios header
        axios.defaults.headers.common['Authorization'] = auth?.token
    
    useEffect(() => {
        const auth = localStorage.getItem('auth')
        if(auth) {
            setAuth(JSON.parse(auth))
        }
    }, [])
    return (
        <AuthContext.Provider value={[ auth, setAuth ]}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }