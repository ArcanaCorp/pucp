import React, { useContext, useEffect, useState } from 'react'
import DBContext from '../../../context/Data/DBContext';
import { IconSearch } from '@tabler/icons-react';
import moment from 'moment';

import Row from './Row'

function Table() {

    const { quotes } = useContext(DBContext);

    const [ filteredQuotes, setFilteredQuotes ] = useState(quotes);
    const [searchFilter, setSearchFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const months = moment.months().map((month, index) => ({
        name: month,
        value: index + 1, // Los meses en Moment.js son base 0, sumamos 1 para base 1
    }));

    const currentYear = moment().year();
    const years = Array.from({ length: 7 }, (v, i) => currentYear - i);

    const handleSearchBar = (e) => setSearchFilter(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value);
    const handleYearChange = (e) => setSelectedYear(e.target.value);

    useEffect(() => {

        const filterQuotes = () => {

            let filtered = quotes;

            if (searchFilter) {
                filtered = filtered.filter((sls) => 
                    sls.company?.name.toLowerCase().includes(searchFilter.toLowerCase())
                )
            }

            if (selectedMonth) {
                filtered = filtered.filter((doc) => 
                    moment(doc.date).month() + 1 === parseInt(selectedMonth)
                );
            }

            if (selectedYear) {
                filtered = filtered.filter((doc) => 
                    moment(doc.date).year() === parseInt(selectedYear)
                );
            }

            setFilteredQuotes(filtered);

        }

        filterQuotes();

    }, [ searchFilter, selectedMonth, selectedYear, quotes ])

    useEffect(() => {
        if (quotes.length > 0) {
            setFilteredQuotes(quotes)
        }
    }, [quotes])

    return (
    
        <>
        
            <div className='__filter_bar'>

                <div style={{display: 'flex', gap: '2rem'}}>
                
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

                </div>

                <div className='__searchbox'>
                    <input type='text' name='search' id='search' placeholder={'Buscar'} onChange={(e) => handleSearchBar(e)} />
                    <span><IconSearch/></span>
                </div>

            </div>

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
        
        </>
    
    )

}

export default Table