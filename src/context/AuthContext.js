import React, {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    function login(jwt_token) {
        const decodedToken = jwt_decode(jwt_token);
        localStorage.setItem('token', jwt_token)
        // console.log(decodedToken)
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: decodedToken.email,
                id: decodedToken.sub
            }
        });
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;