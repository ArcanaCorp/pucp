import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext'

import './styles/header.css'

function Headers() {

    const { handleViewModal } = useContext(UIContext)

    return (
    
        <div className='__header_doc_view'>

            <h1>Documentos</h1>

            <div className='__filters'>
                <button className='__btn_add' onClick={() => handleViewModal('docs', 0)}>Agregar nuevo</button>
            </div>

        </div>
    
    )

}

export default Headers