import React from 'react'

function Row({ number, company }) {
    
    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb' style={{textAlign: 'center'}}>{number}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{company.name}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{company.ruc20}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{company.contacto}</div>
            <div className='__col __col_A' style={{textAlign: 'center'}}>{company.direccion}</div>
        </div>
    
    )

}

export default Row