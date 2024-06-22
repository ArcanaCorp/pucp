import React from 'react'

function Row({ number, company, tipo, price, date }) {
    
    return (
    
        <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
            <div className='__col __col_nmb'>{number}</div>
            <div className='__col __col_A'>{company.name}</div>
            <div className='__col __col_A'>{company.ruc20}</div>
            <div className='__col __col_A'>{company.contacto}</div>
            <div className='__col __col_A'>{company.direccion}</div>
            <div className='__col __col_A'>
                <span className={`__badge_status __badge_status_${tipo === 'venta' ? 'success' : 'error'}`} style={{textTransform: 'uppercase'}}>{tipo}</span>
            </div>
            <div className='__col __col_A'>s/. {price}</div>
            <div className='__col __col_A'>{date}</div>
        </div>
    
    )

}

export default Row