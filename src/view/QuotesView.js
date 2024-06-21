import React, { useContext } from 'react'
import Header from './layout/Quotes/Header'
import Main from './layout/Quotes/Main'
import UIContext from '../context/UI/UIContext'
import Modal from '../components/Modals/Modal';

function QuotesView() {

    const { isViewModal } = useContext(UIContext);

    return (
    
        <>
        
            <Header/>

            <Main/>

            {isViewModal.modal !== '' && ( <Modal type={isViewModal.modal}/> )}
        
        </>
    
    )

}

export default QuotesView