import React from 'react'

import ModalClient from './Clients/ModalClient'
import ModalDoc from './Docs/ModalDoc'
import ModalOrders from './Orders/ModalOrders'
import ModalQuotes from './Quotes/ModalQuotes'

import './styles.css'

function Modal({ type }) {
    
    return (
    
        <div className='__overlay'>

            {type === 'client' && ( <ModalClient/> )}
            {type === 'orders' && ( <ModalOrders/> )}
            {type === 'quotes' && ( <ModalQuotes/> )}
            {type === 'docs' && ( <ModalDoc/> )}

        </div>
    
    )

}

export default Modal