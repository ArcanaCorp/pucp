import React from 'react'
import { documents } from "../../../data/documentData";

import Row from './Row';

import './table.css'

function Table() {

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
                        <Row key={idoc} number={idoc+1} name={doc.name} lastname={doc.lastname} email={doc.email} tipo={doc.type} status={doc.stauts} date={doc.date} />
                    </>
                ))}
            </div>
        </div>
    
    )

}

export default Table