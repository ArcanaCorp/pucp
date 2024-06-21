import React from 'react'
import { orders } from '../../../data/ordersData'

import Row from './Row'

import './table.css'

function Table() {

    return (
    
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Cliente</div>
                <div className='__col'>Fecha</div>
                <div className='__col'>Estado</div>
                <div className='__col'>Detalles</div>
            </div>
            <div className='__table_body'>
                {orders.map((ord) => (
                    <Row key={ord.id} number={ord.id} id={ord.id} company={ord.company.name} date={ord.date} status={ord.status} />
                ))}
            </div>
        </div>
    
    )

}

export default Table