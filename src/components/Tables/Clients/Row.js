import React from 'react'

function Row({ number, company }) {
    
    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb'>{number}</div>
            <div className='__col __col_A'>{company.name}</div>
            <div className='__col __col_A'>{company.ruc20}</div>
            <div className='__col __col_A'>{company.contacto}</div>
            <div className='__col __col_A'>{company.direccion}</div>
        </div>
    
    )

}

export default Row