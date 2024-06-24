import React from 'react'
import './styles/header.css'

function Header() {

    return (
    
        <div className='__header_orders_view'>
            <h1>Compras</h1>
            <div className='__filters'>
                <button className='__btn_add'>Nueva compra</button>
            </div>
        </div>
    
    )

}

export default Header