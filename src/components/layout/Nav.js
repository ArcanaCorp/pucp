import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconCash, IconFiles, IconHome, IconListCheck, IconLogout, IconMenu, IconShoppingCart } from '@tabler/icons-react'

import './styles/nav.css'
import UIContext from '../../context/UI/UIContext';
import AuthContext from '../../context/Auth/AuthContext';

function Nav() {

    const location = useLocation();

    const { handleToogleModal } = useContext(UIContext);
    const { handleLogout } = useContext(AuthContext);

    return (
    
        <nav className='__nav'>

            <div className='__nav_head'>
                <button className='__btn_menu' onClick={handleToogleModal}>
                    <span className='__btn_menu_ico'><IconMenu/></span>
                    <span className='__btn_menu_txt'>UNIFORM S.A.C</span>
                </button>
            </div>

            <div className='__nav_body'>
                <ul className='__items'>
                    <li className={`__item ${location.pathname === '/dashboard' ? '__item--active' : ''}`}>
                        <Link to={'/dashboard'} className='__a_item'>
                            <span className='__ico_item'><IconHome/></span>
                            <span className='__txt_item'>Inicio</span>
                        </Link>
                    </li>
                    <li className={`__item ${location.pathname === '/dashboard/sales' ? '__item--active' : ''}`}>
                        <Link to={'/dashboard/sales'} className='__a_item'>
                            <span className='__ico_item'><IconShoppingCart/></span>
                            <span className='__txt_item'>Ventas</span>
                        </Link>
                    </li>
                    <li className={`__item ${location.pathname === '/dashboard/orders' ? '__item--active' : ''}`}>
                        <Link to={'/dashboard/orders'} className='__a_item'>
                            <span className='__ico_item'><IconListCheck/></span>
                            <span className='__txt_item'>Compras</span>
                        </Link>
                    </li>
                    <li className={`__item ${location.pathname === '/dashboard/quotes' ? '__item--active' : ''}`}>
                        <Link to={'/dashboard/quotes'} className='__a_item'>
                            <span className='__ico_item'><IconCash/></span>
                            <span className='__txt_item'>Cotizaciones</span>
                        </Link>
                    </li>
                    <li className={`__item ${location.pathname === '/dashboard/documents' ? '__item--active' : ''}`}>
                        <Link to={'/dashboard/documents'} className='__a_item'>
                            <span className='__ico_item'><IconFiles/></span>
                            <span className='__txt_item'>Documentos</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='__nav_foot'>
                <button className='__btn_logout' onClick={handleLogout}>
                    <span className='__btn_logout_ico'><IconLogout/></span>
                    <span className='__btn_logout_txt'>Cerrar Sesión</span>
                </button>
            </div>

        </nav>
    
    )

}

export default Nav