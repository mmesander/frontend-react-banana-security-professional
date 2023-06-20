import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token)
            fetchUserData(decodedToken.sub, token)
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(jwt_token) {
        localStorage.setItem('token', jwt_token)
        const decodedToken = jwt_decode(jwt_token);
        fetchUserData(decodedToken.sub, jwt_token, '/profile');
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    async function fetchUserData(id, token, redirect) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data)

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id
                },
                status: 'done',
            });

            if (redirect) {
                navigate(redirect);
            }

        } catch (e) {
            console.error(e)
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            })
        }
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