import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext'

import AvatarProfile from '../../../components/Avatar/AvatarProfile'

import './styles/header.css'

function Header() {

    const { handleViewModal } = useContext(UIContext);

    return (
    
        <div className='__header_home_view'>
            <AvatarProfile/>
            <div className='__actions_shorts'>
                <button className='__btn_actions' onClick={() => handleViewModal('client', 0)}>Nuevo Cliente</button>
                <button className='__btn_actions' onClick={() => handleViewModal('ventas', 0)}>Nueva Venta</button>
                <button className='__btn_actions' onClick={() => handleViewModal('corders', 0)}>Nueva Compra</button>
                <button className='__btn_actions' onClick={() => handleViewModal('aquotes', 0)}>Nueva Cotización</button>
                <button className='__btn_actions' onClick={() => handleViewModal('docs', 0)}>Nuevo Documento</button>
            </div>
        </div>
    
    )

}

export default Header