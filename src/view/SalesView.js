import React, { useContext } from 'react'
import Header from './layout/Sales/Header'
import Main from './layout/Sales/Main'
import UIContext from '../context/UI/UIContext'
import Modal from '../components/Modals/Modal';

function SalesView() {

    const { isViewModal } = useContext(UIContext);

    return (
    
        <>
            <Header/>
            <Main/>

            {isViewModal.modal !== '' && ( <Modal type={isViewModal.modal}/> )}
        </>
    
    )

}

export default SalesView