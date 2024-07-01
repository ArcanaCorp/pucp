import React, { useContext, useEffect, useState } from 'react'
import DBContext from '../../../context/Data/DBContext';
import { IconSearch } from '@tabler/icons-react';
import moment from 'moment';

import Row from './Row';

import '../filters.css'

function Table() {

    const { shoppings } = useContext(DBContext);

    const [ filteredSales, setFilteredSales ] = useState([]);
    const [ searchFilter, setSearchFilter ] = useState();
    const [ selectedMonth, setSelectedMonth ] = useState('');
    const [ selectedYear, setSelectedYear ] = useState('');
    const [ selectedTipo, setSelectedTipo ] = useState('');

    const months = moment.months().map((month, index) => ({
        name: month,
        value: index + 1, // Los meses en Moment.js son base 0, sumamos 1 para base 1
    }));

    const currentYear = moment().year();
    const years = Array.from({ length: 7 }, (v, i) => currentYear - i);

    const handleSearchBar = (e) => setSearchFilter(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value);
    const handleYearChange = (e) => setSelectedYear(e.target.value);
    const handleTipoChange = (e) => setSelectedTipo(e.target.value);

    useEffect(() => {

        const filterSales = () => {

            let filtered = shoppings;

            if (searchFilter) {
                filtered = filtered.filter((sls) => 
                    sls.provider?.name.toLowerCase().includes(searchFilter.toLowerCase())
                )
            }

            if (selectedMonth) {
                filtered = filtered.filter((doc) => 
                    moment(doc.fecha).month() + 1 === parseInt(selectedMonth)
                );
            }

            if (selectedYear) {
                filtered = filtered.filter((doc) => 
                    moment(doc.fecha).year() === parseInt(selectedYear)
                );
            }

            if (selectedTipo) {
                filtered = filtered.filter((doc) => 
                    doc.tipo === selectedTipo
                )
            }

            setFilteredSales(filtered);

        }

        filterSales();

    }, [searchFilter, selectedMonth, selectedYear, selectedTipo, shoppings])

    useEffect(() => {
        if (shoppings.length > 0) {
            setFilteredSales(shoppings)
        }
    }, [shoppings])
    
    return (
    
        <>

            <div className='__filter_bar'>

                <div style={{display: 'flex', gap: '.5rem'}}>
                
                    <select className='__select' onChange={(e) => handleMonthChange(e)}>
                        <option defaultValue={''}>Filtrar por mes</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>{month.name}</option>
                        ))}
                    </select>
                    <select className='__select' onChange={(e) => handleYearChange(e)}>
                        <option defaultValue={''}>Filtrar por año</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <select className='__select' onChange={(e) => handleTipoChange(e)}>
                        <option defaultValue={''}>Filtrar por gasto</option>
                        <option value='Administrativo'>Administrativo</option>
                        <option value={'Productivo'}>Productivo</option>
                    </select>

                </div>

                <div className='__searchbox'>
                    <input type='text' name='search' id='search' placeholder={'Buscar'} onChange={(e) => handleSearchBar(e)} />
                    <span><IconSearch/></span>
                </div>

            </div>

            <div className='__table'>
                <div className='__table_head'>
                    <div className='__col __col_nmb'>N°</div>
                    <div className='__col'>Proveedor</div>
                    <div className='__col'>Tipo</div>
                    <div className='__col'>Insumo</div>
                    <div className='__col'>Total</div>
                    <div className='__col'>Fecha</div>
                    <div className='__col'>Detalles</div>
                </div>
                <div className='__table_body'>
                    {filteredSales.length > 0 ? (
                        <>
                            {filteredSales.map((trcc, itrcc) => (
                                <Row key={itrcc} number={itrcc + 1} company={trcc.provider} tipo={trcc.tipo} insummo={trcc.insumo} price={trcc.total} date={trcc.fecha} />
                            ))}
                        </>
                    ) : (
                        <>
                            <div style={{width: '100%', height: '60px', display: 'grid', placeItems: 'center'}}>No hay datos aún</div>
                        </>
                    )}
                </div>
            </div>
        
        </>
    
    )

}

export default Table