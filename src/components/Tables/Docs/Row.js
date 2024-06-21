import React, { useContext } from 'react'
import AuthContext from '../../../context/Auth/AuthContext';

function Row({ number, name, lastname, email, tipo, status, date, view }) {

    const { isUser } = useContext(AuthContext);

    return (
    
        <>
            <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
                <div className='__col __col_nmb'>{number}</div>
                <div className='__col __col_A'>
                    <p className='__txt_primary'>{name} {lastname}</p>
                    <p className='__txt_secondary'>{email}</p>
                </div>
                <div className='__col'>
                    <span className={`__badge_status __badge_status${status === '1' ? '_success' : '_warning'}`}>{status === '1' ? 'Entregado' : 'Pendiente'}</span>
                </div>
                <div className='__col'><span style={{textTransform: 'uppercase'}}>{tipo}</span></div>
                <div className='__col'>
                    <p className='__txt_primary'>{date}</p>
                    <p className='__txt_secondary'>Agregado por <b>{isUser.name}</b></p>
                </div>
            </div>
        </>
    
    )

}

export default Row