import React, { useContext } from 'react'
import './styles/header.css'
import UIContext from '../../../context/UI/UIContext';

function Header() {

    const { handleViewModal } = useContext(UIContext);
    
    return (
    
        <div className='__header_orders_view'>
            <h1>Ventas</h1>
            <div className='__filters'>
                <button className='__btn_add' onClick={() => handleViewModal('nventas', 0)}>Nuevo Producto</button>
                <button className='__btn_add' onClick={() => handleViewModal('ventas', 0)}>Nueva Pedido</button>
            </div>
        </div>
    
    )

}

export default Header