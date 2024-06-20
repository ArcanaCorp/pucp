import React, { useContext, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import UIContext from '../context/UI/UIContext';
import AuthContext from '../context/Auth/AuthContext';

import Alert from '../components/Alerts/Alert'

import image from '../static/img/improved-result-illustration.png'

import './styles/authlayout.css'

function AuthLayout() {

    const navigate = useNavigate();
    const location = useLocation();
    const { isMessagesAlert } = useContext(UIContext);
    const { isAuth } = useContext(AuthContext);

    const toogleDesign = () => {
        const style = document.getElementById('root');
        style.classList.toggle('__xhsy7');
    }

    useEffect(() => {

        if (isAuth) navigate('/dashboard');
    
        toogleDesign();

        return () => {
            toogleDesign();
        }

    }, [isAuth, navigate])

    return (
    
        <>
        
            <div className='__lft'>

                <div className='__content_lft'>

                    <div className='__title_lft'>
                        <h2>UNIFORM S.A.C</h2>
                        <p>Bienvenido a la plataforma</p>
                    </div>

                    <Outlet/>

                    <div className='__btm_lft'>
                        {location.pathname === '/' ? (
                            <h4>¿Aún no tienes una cuenta?. <Link to={'/sign'}>Registrate aquí</Link></h4>
                        ) : (
                            <h4>¿Ya tienes una cuenta?. <Link to={'/'}>Iniciar sesión</Link></h4>
                        )}
                    </div>

                </div>

            </div>

            <div className='__rgt'>

                <div className='__image'>
                    <img src={image} alt={`Ilustración de bienvenida para el panel de administracion de UNIFORM S.A.C`} />
                </div>

            </div>

            {isMessagesAlert.message !== '' && ( <Alert type={isMessagesAlert.type} message={isMessagesAlert.message} /> )}

        </>
    
    )

}

export default AuthLayout