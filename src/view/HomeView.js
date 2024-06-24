import React, { useContext } from 'react'

import UIContext from '../context/UI/UIContext'
import Modal from '../components/Modals/Modal';

import Header from './layout/Home/Header'
import Main from './layout/Home/Main'

function HomeView() {

    const { isViewModal } = useContext(UIContext);

    return (
    
        <>
        
            <Header/>

            <Main/>

            {isViewModal.modal !== '' && ( <Modal type={isViewModal.modal}/> )}

        </>
    
    )

}

export default HomeView