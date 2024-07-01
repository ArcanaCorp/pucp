import React, { useContext } from 'react'
import './styles/header.css'
import UIContext from '../../../context/UI/UIContext'

function Header() {

    const { handleViewModal } = useContext(UIContext);

    return (
    
        <div className='__header_orders_view'>
            <h1>Compras</h1>
            <div className='__filters'>
                <button className='__btn_add' onClick={() => handleViewModal('providers', 0)}>Nuevo Proveedor</button>
                <button className='__btn_add' onClick={() => handleViewModal('corders', 0)}>Nueva compra</button>
            </div>
        </div>
    
    )

}

export default Header