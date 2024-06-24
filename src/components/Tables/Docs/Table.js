import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../../../context/Filter/FilterContext';
import DBContext from '../../../context/Data/DBContext';

import Row from './Row';

import './table.css';

function Table() {

    const { docs } = useContext(DBContext);
    const { searchFilter } = useContext(FilterContext);

    const [ filteredDocuments, setFilteredDocuments ] = useState(docs);

    useEffect(() => {
        if (searchFilter.table === 'doc') {

            let filteredDocs = [...docs];

            if (searchFilter.query !== '') {
                const query = searchFilter.query;
                filteredDocs = filteredDocs.filter((doc) => {
                    const clientName = doc.client?.name === '' ? '' : doc.client.name;
                    clientName.toLowerCase().includes(query)
                })
            }
    
            if (searchFilter.year !== '') {
                filteredDocs = filteredDocs.filter((doc) => doc.year === searchFilter.year);
            }
    
            if (searchFilter.month !== '') {
                filteredDocs = filteredDocs.filter((doc) => doc.month === searchFilter.month);
            }
    
            if (searchFilter.tipo !== '') {
                filteredDocs = filteredDocs.filter((doc) => doc.type === searchFilter.tipo);
            }

            setFilteredDocuments(filteredDocs);

        } else {
            setFilteredDocuments(docs)
        }
    }, [searchFilter, docs])

    return (
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Cliente</div>
                <div className='__col'>Tipo</div>
                <div className='__col'>Fecha</div>
            </div>
            <div className='__table_body'>
                {filteredDocuments.map((doc) => (
                    <Row key={doc.id} number={doc.id} name={doc.client.name} contact={doc.client.contact} tipo={doc.type} status={doc.stauts} response={doc.response} date={doc.date} />
                ))}
            </div>
        </div>
    );
}

export default Table;
