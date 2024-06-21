import React from 'react'
import Row from './Row'

import { cotizaciones } from "../../../data/cotizacionData";

function Table() {

    return (
    
        <div className='__table'>

            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Razón social</div>
                <div className='__col'>RUC</div>
                <div className='__col'>Contacto</div>
                <div className='__col'>Dirección</div>
                <div className='__col'>Fecha</div>
                <div className='__col'>Cotizacion</div>
                <div className='__col'>Detalles</div>
            </div>
            <div className='__table_body'>
                {cotizaciones.map((quote, iq) => (
                    <Row key={iq} number={iq+1} code={quote.code} company={quote.company} date={quote.date} price={quote.price} />
                ))}
            </div>

        </div>
    
    )

}

export default Table