import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { API } from "../../api/api";

import UIContext from "../UI/UIContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { handleMessageAlert } = useContext(UIContext);

    const cookieAuth = Cookies.get('u_token');

    const [ isAuth, setIsAuth ] = useState(cookieAuth && cookieAuth.trim() !== '');
    const [ isUser, setIsUser ] = useState([]);

    const [ userLogin, setUserLogin ] = useState({
        email: '',
        password: ''
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const handleChangeLogin = (e) => {
        const { value, name } = e.target;
        setUserLogin(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async () => {

        if (userLogin.email === '' || userLogin.password === '') return handleMessageAlert('warning', 'Por favor completa los campos requeridos.')
        
        setIsLoading(true);

        try {

            const formData = new FormData();
            formData.append('email', userLogin.email)
            formData.append('password', userLogin.password)
            
            await fetch(`${API.URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    handleMessageAlert('success', data.message)
                    Cookies.set('u_token', data.token, { expires: 365 })
                    setIsAuth(true);
                    const userInfo = jwtDecode(data.token)
                    setIsUser(userInfo)
                } else {
                    handleMessageAlert('warning', data.message)
                }
            })
            .catch((error) => {
                handleMessageAlert('error', `Hubo un error al hacer la petición`)
            })
            .finally(() => {
                setIsLoading(false)
            })

        } catch (error) {
            handleMessageAlert('error', 'Hubo un error interno en el servidor')
        }

    }

    const handleDecodedUser = useCallback(async (token) => {
        const userInfo = jwtDecode(token);
        setIsUser(userInfo)
    }, [])

    useEffect(() => {
        const getUser = async () => {
            if (Cookies.get('u_token') && isUser.length === 0) await handleDecodedUser(Cookies.get('u_token'))
        }
        getUser();
    }, [handleDecodedUser, isUser]);

    const contextValue = {
        isAuth, 
        isUser,
        isLoading,
        handleChangeLogin,
        handleLogin
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export default AuthContext;