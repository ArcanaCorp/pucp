import { IconFileSearch } from '@tabler/icons-react';
import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext';
import moment from 'moment';

function Row({ number, id, company, date, status }) {

    const { handleViewModal } = useContext(UIContext);
    const formatedDate = moment(date).format('DD / MM / YYYY')

    const statusTextMap = {
        '0': 'Recibido',
        '1': 'En proceso',
        '2': 'Entregado',
        '3': 'Finalizado'
    };
    const statusTextMap2 = {
        '0': 'gray',
        '1': 'warning',
        '2': 'success',
        '3': 'info'
    }

    // Obtener el texto del estado
    const txtStatus = statusTextMap[status] || status;
    const txtClases = statusTextMap2[status] || status

    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb'>{number}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{company}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{formatedDate}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>
                <span className={`__badge_status __badge_status_${txtClases}`}>{txtStatus}</span>
            </div>
            <div className='__col __col_A'>
                <button onClick={() => handleViewModal('orders', id)}><IconFileSearch/></button>
            </div>
        </div>
    
    )

}

export default Row