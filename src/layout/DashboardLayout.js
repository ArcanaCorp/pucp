import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import UIContext from '../context/UI/UIContext';
import AuthContext from '../context/Auth/AuthContext'

import Nav from '../components/layout/Nav';
import Main from '../components/layout/Main';
import Alert from '../components/Alerts/Alert'

import './styles/dashboardlayout.css'

function DashboardLayout() {

    const navigate = useNavigate();
    const { isMessagesAlert } = useContext(UIContext);
    const { isAuth } = useContext(AuthContext);

    const toogleDesign = () => {
        const style = document.getElementById('root');
        style.classList.toggle('__xhsy8');
    }

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }

        toogleDesign();

        return () => {
            toogleDesign();
        }

    }, [isAuth, navigate])

    return (
    
        <>

            <Nav/>

            <Main>
                <Outlet/>
            </Main>

            {isMessagesAlert.message !== '' && ( <Alert type={isMessagesAlert.type} message={isMessagesAlert.message} bg={isMessagesAlert.style} /> )}

        </>
    
    )

}

export default DashboardLayout