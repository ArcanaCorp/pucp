import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext'

function ModalAQuotes() {

    const { handleViewModal } = useContext(UIContext);
    
    return (
    
        <div className='__modal'>

            <div className='__modal_header'>
                <h2>Agregar Nueva Cotización</h2>
            </div>

            <div className='__modal_body'></div>

            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
            </div>

        </div>
    
    )

}

export default ModalAQuotes