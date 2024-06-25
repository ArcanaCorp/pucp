import React, { useContext, useEffect, useState } from 'react'
import { orders } from '../../../data/ordersData'
import FilterContext from '../../../context/Filter/FilterContext'

import Row from './Row'

import './table.css'

function Table() {

    const { searchFilter } = useContext(FilterContext);

    const [ filteredOrders, setFilteredOrders ] = useState([]);

    useEffect(() => {
        if (searchFilter.table === 'orders') {
            const filter = orders.filter((odr) => {
                return (
                    odr.company.name.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.ruc20.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.contacto.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.direccion.toLocaleLowerCase().includes(searchFilter.query)
                );
            })
            setFilteredOrders(filter);   
        } else {
            setFilteredOrders(orders)
        }
    }, [searchFilter])

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
                {filteredOrders.map((ord) => (
                    <Row key={ord.id} number={ord.id} id={ord.id} company={ord.company.name} date={ord.date} status={ord.status} />
                ))}
            </div>
        </div>
    
    )

}

export default Table