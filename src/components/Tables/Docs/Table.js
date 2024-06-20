import React, { useContext } from 'react'
import { documents } from "../../../data/documentData";
import AuthContext from '../../../context/Auth/AuthContext';

import './table.css'

function Table() {

    const { isUser } = useContext(AuthContext);

    return (
    
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Cliente</div>
                <div className='__col'>Estado</div>
                <div className='__col'>Tipo</div>
                <div className='__col'>Fecha</div>
                <div className='__col'>Actions</div>
            </div>
            <div className='__table_body'>
                {documents.map((doc, idoc) => (
                    <>
                        <div className={`__row_body ${(idoc + 1) % 2 === 0 ? '__row_body_bg' : ''}`} key={idoc}>
                            <div className='__col __col_nmb'>{idoc+1}</div>
                            <div className='__col __col_A'>
                                <p className='__txt_primary'>{doc.name} {doc.lastname}</p>
                                <p className='__txt_secondary'>{doc.email}</p>
                            </div>
                            <div className='__col'>
                                <span className={`__badge_status __badge_status${doc.stauts === '1' ? '_success' : '_warning'}`}>{doc.stauts === '1' ? 'Entregado' : 'Pendiente'}</span>
                            </div>
                            <div className='__col'></div>
                            <div className='__col'>
                                <p className='__txt_primary'>{doc.date}</p>
                                <p className='__txt_secondary'>Agregado por <b>{isUser.name}</b></p>
                            </div>
                            <div className='__col'></div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    
    )

}

export default Table