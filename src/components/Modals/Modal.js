import React from 'react'

import ModalClient from './Clients/ModalClient'
import ModalDoc from './Docs/ModalDoc'
import ModalOrders from './Orders/ModalOrders'
import ModalQuotes from './Quotes/ModalQuotes'

import './styles.css'
import ModalCreate from './Orders/ModalCreate'
import ModalSales from './Sales/ModalSales'
import ModalAQuotes from './Quotes/ModalAQuotes'
import ModalNSales from './Sales/ModalNSales'
import ModalProvider from './Orders/ModalProvider'
import ModalEdit from './Docs/ModalEdit'

function Modal({ type }) {
    
    return (
    
        <div className='__overlay'>

            {type === 'client' && ( <ModalClient/> )}

            {type === 'orders' && ( <ModalOrders/> )}
            {type === 'corders' && ( <ModalCreate/> )}
            {type === 'providers' && ( <ModalProvider/> )}

            {type === 'ventas' && ( <ModalSales/> )}
            {type === 'nventas' && ( <ModalNSales/> )}
            
            {type === 'quotes' && ( <ModalQuotes/> )}
            {type === 'aquotes' && ( <ModalAQuotes/> )}
            
            {type === 'docs' && ( <ModalDoc/> )}
            {type === 'editdocs' && ( <ModalEdit/> )}

        </div>
    
    )

}

export default Modal