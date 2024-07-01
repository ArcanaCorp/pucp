import React, { useContext, useEffect, useState } from 'react'
import FilterContext from '../../../context/Filter/FilterContext'

import Row from './Row'

import './table.css'
import DBContext from '../../../context/Data/DBContext'

function Table() {

    const { sales } = useContext(DBContext);
    const { searchFilter } = useContext(FilterContext);

    const [ filteredOrders, setFilteredOrders ] = useState([]);

    useEffect(() => {
        if (sales.length > 0) {
            setFilteredOrders(sales)
        }
    }, [sales])

    return (
    
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Cliente</div>
                <div className='__col'>Fecha</div>
                <div className='__col'>Estado</div>
                <div className='__col'>Detalles del pedido</div>
            </div>
            <div className='__table_body'>
                {filteredOrders.length > 0 ? (
                    <>
                        {filteredOrders.map((ord) => (
                            <Row key={ord.id} number={ord.id} id={ord.id} company={ord.company.name} date={ord.date} status={ord.status} />
                        ))}
                    </>
                ) : (
                    <>
                        <div style={{width: '100%', height: '60px', display: 'grid', placeItems: 'center'}}>No hay datos aún</div>
                    </>
                )}
            </div>
        </div>
    
    )

}

export default Table