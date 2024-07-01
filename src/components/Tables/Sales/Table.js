import React, { useContext, useEffect, useState } from 'react'
import Row from './Row';
import FilterContext from '../../../context/Filter/FilterContext';
import DBContext from '../../../context/Data/DBContext';

function Table() {

    const { shoppings } = useContext(DBContext);
    const { searchFilter } = useContext(FilterContext);

    const [ filteredSales, setFilteredSales ] = useState([]);

    useEffect(() => {
        if (shoppings.length > 0) {
            setFilteredSales(shoppings)
        }
    }, [shoppings])
    
    return (
    
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Proveedor</div>
                <div className='__col'>Insumo</div>
                <div className='__col'>Total</div>
                <div className='__col'>Fecha</div>
                <div className='__col'>Detalles</div>
            </div>
            <div className='__table_body'>
                {filteredSales.length > 0 ? (
                    <>
                        {filteredSales.map((trcc, itrcc) => (
                            <Row key={itrcc} number={itrcc + 1} company={trcc.provider} insummo={trcc.insumo} price={trcc.total} date={trcc.fecha} />
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