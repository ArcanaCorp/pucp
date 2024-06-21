import React, { useContext } from 'react'
import Header from './layout/Orders/Header'
import Main from './layout/Orders/Main'
import UIContext from '../context/UI/UIContext'
import Modal from '../components/Modals/Modal';

function OrdersView() {

    const { isViewModal } = useContext(UIContext);

    return (
    
        <>
        
            <Header/>

            <Main/>

            {isViewModal.modal !== '' && ( <Modal type={isViewModal.modal} /> )}

        </>
    
    )

}

export default OrdersView