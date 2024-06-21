import React, { useContext } from 'react'
import Headers from './layout/Documents/Headers'
import Main from './layout/Documents/Main'
import UIContext from '../context/UI/UIContext'
import Modal from '../components/Modals/Modal';

function DocumentsView() {

    const { isViewModal } = useContext(UIContext);

    return (
    
        <>
        
            <Headers/>

            <Main/>

            {isViewModal.modal !== '' && ( <Modal type={isViewModal.modal} /> )}

        </>
    
    )

}

export default DocumentsView