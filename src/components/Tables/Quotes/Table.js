import React, { useContext, useEffect, useState } from 'react'
import Row from './Row'

import { cotizaciones } from "../../../data/cotizacionData";
import FilterContext from '../../../context/Filter/FilterContext';

function Table() {

    const { searchFilter } = useContext(FilterContext);

    const [ filteredQuotes, setFilteredQuotes ] = useState([]);

    useEffect(() => {
        if (searchFilter.table === 'quotes') {
            const filter = cotizaciones.filter((odr) => {
                return (
                    odr.company.name.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.ruc20.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.contacto.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.company.direccion.toLocaleLowerCase().includes(searchFilter.query)
                );
            })
            setFilteredQuotes(filter);   
        } else {
            setFilteredQuotes(cotizaciones)
        }
    }, [searchFilter])

    return (
    
        <div className='__table'>

            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Razón social</div>
                <div className='__col'>RUC</div>
                <div className='__col'>Cotización</div>
                <div className='__col'>Fecha</div>
                <div className='__col'>Detalles</div>
            </div>
            <div className='__table_body'>
                {filteredQuotes.map((quote, iq) => (
                    <Row key={iq} number={iq+1} code={quote.code} company={quote.company} date={quote.date} price={quote.price} />
                ))}
            </div>

        </div>
    
    )

}

export default Table