import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext'

import './styles/dashboardlayout.css'
import Nav from '../components/layout/Nav';
import Main from '../components/layout/Main';

function DashboardLayout() {

    const navigate = useNavigate();
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

        </>
    
    )

}

export default DashboardLayout