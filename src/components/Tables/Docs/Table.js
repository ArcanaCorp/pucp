import React, { useContext, useEffect, useState } from 'react';
import DBContext from '../../../context/Data/DBContext';

import Row from './Row';

import './table.css';
import moment from 'moment';
import { IconSearch } from '@tabler/icons-react';

function Table() {

    const { docs } = useContext(DBContext);

    const [ filteredDocuments, setFilteredDocuments ] = useState([]);
    const [ searchFilter, setSearchFilter ] = useState('');
    const [ selectedMonth, setSelectedMonth ] = useState('');
    const [ selectedYear, setSelectedYear ] = useState('');

    const months = moment.months().map((month, index) => ({
        name: month,
        value: index + 1, // Los meses en Moment.js son base 0, sumamos 1 para base 1
    }));

    const currentYear = moment().year();
    const years = Array.from({ length: 7 }, (v, i) => currentYear - i);

    const handleSearchBar = (e) => setSearchFilter(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value || ''); // Asigna '' si se selecciona el valor por defecto
    const handleYearChange = (e) => setSelectedYear(e.target.value || ''); // Asigna '' si se selecciona el valor por defecto

    useEffect(() => {
        const filterDocuments = () => {
            let filtered = docs;

            if (searchFilter) {
                filtered = filtered.filter((sls) => 
                    sls.client?.name.toLowerCase().includes(searchFilter.toLowerCase())
                );
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

            setFilteredDocuments(filtered);
        }

        filterDocuments();
    }, [searchFilter, selectedMonth, selectedYear, docs]);

    useEffect(() => {
        if (docs.length > 0) {
            setFilteredDocuments(docs);
        }
    }, [docs])

    return (
        <>
            <div className='__filter_bar'>
                <div style={{display: 'flex', gap: '2rem'}}>
                    <select className='__select' onChange={(e) => handleMonthChange(e)}>
                        <option value={''}>Filtrar por mes</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>{month.name}</option>
                        ))}
                    </select>
                    <select className='__select' onChange={(e) => handleYearChange(e)}>
                        <option value={''}>Filtrar por año</option>
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
                    <div className='__col'>Cliente</div>
                    <div className='__col'>Tipo</div>
                    <div className='__col'>Fecha</div>
                    <div className='__col'>Acciones</div>
                </div>
                <div className='__table_body'>
                    {filteredDocuments.length > 0 ? (
                        <>
                            {filteredDocuments.map((doc, indice) => (
                                <Row key={doc.id} id={doc.id} number={indice + 1} name={doc.client.name} contact={doc.client.contact} tipo={doc.type} status={doc.stauts} response={doc.response} date={doc.date} />
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
    );
}

export default Table;