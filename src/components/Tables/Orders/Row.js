import { IconFileSearch } from '@tabler/icons-react';
import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext';

function Row({ number, id, company, date, status }) {

    const { handleViewModal } = useContext(UIContext);

    const statusTextMap = {
        '1': 'En proceso',
        '2': 'Entregado',
        '3': 'Finalizado'
    };

    // Obtener el texto del estado
    const txtStatus = statusTextMap[status] || status;

    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb'>{number}</div>
            <div className='__col __col_A'>{company}</div>
            <div className='__col __col_A'>{date}</div>
            <div className='__col __col_A'>{txtStatus}</div>
            <div className='__col __col_A'>
                <button onClick={() => handleViewModal('orders', id)}><IconFileSearch/></button>
            </div>
        </div>
    
    )

}

export default Row