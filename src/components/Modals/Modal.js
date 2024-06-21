import React from 'react'
import ModalOrders from './Orders/ModalOrders'
import ModalQuotes from './Quotes/ModalQuotes'

import './styles.css'

function Modal({ type }) {
    
    return (
    
        <div className='__overlay'>

            {type === 'orders' && ( <ModalOrders/> )}
            {type === 'quotes' && ( <ModalQuotes/> )}

        </div>
    
    )

}

export default Modal