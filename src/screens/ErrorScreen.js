import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/Auth/AuthContext'

import image from '../static/img/404-not-found.png'

import './styles/error.css'

function ErrorScreen() {

    const { isAuth } = useContext(AuthContext);

    return (
    
        <div className='__err0r'>

            <div className='__content_err0r'>

                <div className='__imgs'>
                    <img src={image} alt='Ilustración de página no encontrada' />
                </div>

                <div className='__txt'>
                    <h1>404</h1>
                    <p>Página no encontrada</p>
                    <Link to={isAuth ? '/dashboard' : '/'}>Volver al inicio</Link>
                </div>

            </div>

        </div>
    
    )

}

export default ErrorScreen