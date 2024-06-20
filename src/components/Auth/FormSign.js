import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

import AuthContext from '../../context/Auth/AuthContext';

import './styles/form.css'

function FormSign() {

    const { handleChangeLogin, handleLogin, isLoading } = useContext(AuthContext);

    const [ viewPassword, setViewPassword ] = useState(false);

    return (
    
        <>
        
            <div className='__form'>

                <div className='__form_group'>
                    <label htmlFor='name' aria-label='Ingresa tu nombre de usuario'>Ingresa tu nombre de usuario</label>
                    <div className='__form_control'>
                        <input type='text' className='__entry __entry_normal' name='name' id='name' placeholder='Ingresa tu nombre de usuario' aria-placeholder='Ingresa tu nombre de usuario' onChange={(e) => handleChangeLogin(e)} />
                    </div>
                </div>

                <div className='__form_group'>
                    <label htmlFor='email' aria-label='Ingresa tu E-mail o correo electrónico'>Ingresa tu E-mail o correo electrónico</label>
                    <div className='__form_control'>
                        <input type='email' className='__entry __entry_normal' name='email' id='email' placeholder='Ingresa tu E-mail o correo electrónico' aria-placeholder='Ingresa tu E-mail o correo electrónico' onChange={(e) => handleChangeLogin(e)} />
                    </div>
                </div>

                <div className='__form_group'>
                    <label htmlFor='pwd' aria-label='Ingresar tu contraseña'>Ingresar tu contraseña</label>
                    <div className='__form_control'>
                        <input type={viewPassword ? 'text' : 'password'} className='__entry __entry_pwd' name='password' id='pwd' placeholder='Ingresar tu contraseña' aria-placeholder='Ingresar tu contraseña' onChange={(e) => handleChangeLogin(e)} />
                        <span className='__btn_toogle_view' onClick={() => setViewPassword(!viewPassword)}>{ viewPassword ? <IconEyeOff/> : <IconEye/> }</span>
                    </div>
                    <Link to={'/recover'} className='__a __a_recover'>¿Olvidaste tu contraseña?</Link>
                </div>
                
                <div className='__form_group'>
                    <button type='submit' className='__btn_login' onClick={handleLogin}>{isLoading ? <span className='__loader'></span> : 'Iniciar Sesión'}</button>
                </div>

            </div>

        </>
    
    )

}

export default FormSign