import { IconFileSearch } from '@tabler/icons-react'
import moment from 'moment'
import React from 'react'

function Row({ number, company, tipo, insummo, price, date }) {

    const formattedDate = moment(date).format('DD / MM / YYYY')
    
    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb' style={{textAlign: 'center'}}>{number}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{company.name}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{tipo}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{insummo}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>s/. {price}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{formattedDate}</div>
            <div className='__col __col_A'>
                <button><IconFileSearch/></button>
            </div>
        </div>
    
    )

}

export default Row