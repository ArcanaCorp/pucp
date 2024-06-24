import { IconFileSearch } from '@tabler/icons-react'
import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext'
import moment from 'moment';

function Row({ number, code, company, date, price }) {
    
    const { handleViewModal } = useContext(UIContext);

    const formatedDate = moment(date).format('DD [/] MM [/] YYYY')
    
    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb'>{number}</div>
            <div className='__col __col_A'>{company.name}</div>
            <div className='__col __col_A'>{company.ruc20}</div>
            <div className='__col __col_A'>s/. {price}</div>
            <div className='__col __col_A'>{formatedDate}</div>
            <div className='__col __col_A'>
                <button onClick={() => handleViewModal('quotes', code)}><IconFileSearch/></button>
            </div>
        </div>
    
    )

}

export default Row