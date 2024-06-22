import React, { useContext, useEffect, useState } from 'react'
import { transacciones } from "../../../data/transaccionesData";
import Row from './Row';
import FilterContext from '../../../context/Filter/FilterContext';

function Table() {

    const { searchFilter } = useContext(FilterContext);

    const [ filteredSales, setFilteredSales ] = useState([]);

    useEffect(() => {
        if (searchFilter.table === 'sales') {
            const filter = transacciones.filter((odr) => {
                return (
                    odr.company.name.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.ruc20.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.contacto.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.direccion.toLocaleLowerCase().includes(searchFilter.query)
                );
            })
            setFilteredSales(filter);   
        } else {
            setFilteredSales(transacciones)
        }
    }, [searchFilter])
    
    return (
    
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Razón social</div>
                <div className='__col'>RUC</div>
                <div className='__col'>Contacto</div>
                <div className='__col'>Dirección</div>
                <div className='__col'>Tipo</div>
                <div className='__col'>Total</div>
                <div className='__col'>Fecha</div>
            </div>
            <div className='__table_body'>
                {filteredSales.map((trcc, itrcc) => (
                    <Row key={itrcc} number={itrcc + 1} company={trcc.company} tipo={trcc.tipo} price={trcc.montoTotal} date={trcc.fecha} />
                ))}
            </div>
        </div>
    
    )

}

export default Table