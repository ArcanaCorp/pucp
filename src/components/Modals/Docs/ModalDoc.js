import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext'
import CreateDoc from '../../sections/Docs/CreateDoc';

function ModalDoc() {

    const { handleViewModal } = useContext(UIContext);

    return (
    
        <div className='__modal'>
            <div className='__modal_header'><h2>Guardar nuevo documento</h2></div>
            <div className='__modal_body'><CreateDoc/></div>
            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
            </div>
        </div>
    
    )

}

export default ModalDoc