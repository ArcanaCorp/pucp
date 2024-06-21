import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext';
import { cotizaciones } from "../../../data/cotizacionData";

import './styles.css'
import Factura from '../../sections/Quotes/Factura/Factura';

function ModalQuotes() {

    const { isViewModal, handleViewModal } = useContext(UIContext);

    const data = cotizaciones.find((quote) => quote.code === isViewModal.id);

    return (
    
        <div className='__modal'>

            <div className='__modal_header'><h2>{data.company.name}</h2></div>

            <div className='__modal_body'><Factura data={data} /></div>

            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
            </div>

        </div>
    
    )

}

export default ModalQuotes