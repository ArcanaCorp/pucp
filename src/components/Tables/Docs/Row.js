import React from 'react'
import moment from 'moment';
import 'moment/locale/es';

function Row({ number, name, contact, tipo, response, date }) {

    const formattedDate = moment(date).format('DD [/] MM [/] YYYY'); // Ejemplo: "May 31, 2024"

    return (
    
        <>
            <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
                <div className='__col __col_nmb'>{number}</div>
                <div className='__col __col_A'>
                    <p className='__txt_primary'>{name}</p>
                    <p className='__txt_secondary'>{contact}</p>
                </div>
                <div className='__col'><span style={{textTransform: 'uppercase'}}>{tipo}</span></div>
                <div className='__col'>
                    <p className='__txt_primary'>{formattedDate}</p>
                    <p className='__txt_secondary'>Agregado por <b>{response}</b></p>
                </div>
            </div>
        </>
    
    )

}

export default Row