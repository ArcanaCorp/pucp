import { IconFileSearch } from '@tabler/icons-react'
import moment from 'moment'
import React from 'react'

function Row({ number, company, price, date }) {

    const formattedDate = moment(date).format('DD / MM / YYYY')
    
    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb'>{number}</div>
            <div className='__col __col_A'>{company.name}</div>
            <div className='__col __col_A'>{company.ruc20}</div>
            <div className='__col __col_A'>s/. {price}</div>
            <div className='__col __col_A'>{formattedDate}</div>
            <div className='__col __col_A'>
                <button><IconFileSearch/></button>
            </div>
        </div>
    
    )

}

export default Row