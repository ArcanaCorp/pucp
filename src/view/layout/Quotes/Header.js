import React, { useContext } from 'react'
import './styles/header.css'
import UIContext from '../../../context/UI/UIContext'

function Header() {

    const { handleViewModal } = useContext(UIContext);

    return (
    
        <div className='__header_orders_view'>
            <h1>Cotizaciones</h1>
            <div className='__filters'>
                <button className='__btn_add' onClick={() => handleViewModal('aquotes', 0)}>Nueva cotización</button>
            </div>
        </div>
    
    )

}

export default Header