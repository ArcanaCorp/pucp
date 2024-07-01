import React, { useContext, useEffect, useState } from 'react'
import Row from './Row'
import FilterContext from '../../../context/Filter/FilterContext';
import DBContext from '../../../context/Data/DBContext';

function Table() {

    const { quotes } = useContext(DBContext);
    const { searchFilter } = useContext(FilterContext);

    console.log(searchFilter);

    const [ filteredQuotes, setFilteredQuotes ] = useState(quotes);

    useEffect(() => {
        if (quotes.length > 0) {
            setFilteredQuotes(quotes)
        }
    }, [quotes])

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
                {filteredQuotes.length > 0 ? (
                    <>
                        {filteredQuotes.map((quote, iq) => (
                            <Row key={iq} number={iq+1} code={quote.code} company={quote.company} price={quote.total} date={quote.date} />
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