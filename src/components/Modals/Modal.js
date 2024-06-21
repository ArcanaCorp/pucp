import React from 'react'
import ModalDoc from './Docs/ModalDoc'
import ModalOrders from './Orders/ModalOrders'
import ModalQuotes from './Quotes/ModalQuotes'

import './styles.css'

function Modal({ type }) {
    
    return (
    
        <div className='__overlay'>

            {type === 'docs' && ( <ModalDoc/> )}
            {type === 'orders' && ( <ModalOrders/> )}
            {type === 'quotes' && ( <ModalQuotes/> )}

        </div>
    
    )

}

export default Modal