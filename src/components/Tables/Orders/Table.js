import React, { useContext, useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import moment from 'moment';

import DBContext from '../../../context/Data/DBContext';

import Row from './Row';

import './table.css';
import '../filters.css';

function Table() {
    const { sales } = useContext(DBContext);

    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const months = moment.months().map((month, index) => ({
        name: month,
        value: index + 1, // Los meses en Moment.js son base 0, sumamos 1 para base 1
    }));

    const currentYear = moment().year();
    const years = Array.from({ length: 7 }, (v, i) => currentYear - i);

    const handleSearchBar = (e) => setSearchFilter(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value || ''); // Asigna '' si se selecciona el valor por defecto
    const handleYearChange = (e) => setSelectedYear(e.target.value || ''); // Asigna '' si se selecciona el valor por defecto
    const handleStatusChange = (e) => setSelectedStatus(e.target.value || ''); // Asigna '' si se selecciona el valor por defecto

    useEffect(() => {
        const filterOrders = () => {
            let filtered = sales;

            if (searchFilter) {
                filtered = filtered.filter((sls) =>
                    sls.company?.name.toLowerCase().includes(searchFilter.toLowerCase())
                );
            }

            if (selectedMonth) {
                filtered = filtered.filter(
                    (doc) => moment(doc.fecha).month() + 1 === parseInt(selectedMonth)
                );
            }

            if (selectedYear) {
                filtered = filtered.filter((doc) => moment(doc.fecha).year() === parseInt(selectedYear));
            }

            if (selectedStatus !== '') {
                filtered = filtered.filter((doc) => doc.status.toString() === selectedStatus);
            }

            setFilteredOrders(filtered);
        };

        filterOrders();
    }, [searchFilter, selectedMonth, selectedYear, selectedStatus, sales]);

    useEffect(() => {
        if (sales.length > 0) {
            setFilteredOrders(sales);
        }
    }, [sales]);

    return (
        <>
            <div className='__filter_bar'>
                <div style={{ display: 'flex', gap: '.5rem' }}>
                    <select className='__select' onChange={(e) => handleMonthChange(e)}>
                        <option value={''}>Filtrar por mes</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.name}
                            </option>
                        ))}
                    </select>
                    <select className='__select' onChange={(e) => handleYearChange(e)}>
                        <option value={''}>Filtrar por año</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <select className='__select' onChange={(e) => handleStatusChange(e)}>
                        <option value={''}>Filtrar por estado</option>
                        <option value={'0'}>Recibido</option>
                        <option value={'1'}>Proceso</option>
                        <option value={'2'}>Entregado</option>
                        <option value={'3'}>Finalizado</option>
                    </select>
                </div>

                <div className='__searchbox'>
                    <input
                        type='text'
                        name='search'
                        id='search'
                        placeholder={'Buscar'}
                        onChange={(e) => handleSearchBar(e)}
                    />
                    <span>
                        <IconSearch />
                    </span>
                </div>
            </div>

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
                                <Row
                                    key={ord.id}
                                    number={ord.id}
                                    id={ord.id}
                                    company={ord.company.name}
                                    date={ord.fecha}
                                    status={ord.status}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    width: '100%',
                                    height: '60px',
                                    display: 'grid',
                                    placeItems: 'center',
                                }}
                            >
                                No hay datos aún
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Table;