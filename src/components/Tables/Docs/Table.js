import React, { useContext, useEffect, useState } from 'react';
import { documents } from "../../../data/documentData";
import FilterContext from '../../../context/Filter/FilterContext';

import Row from './Row';

import './table.css';

function Table() {

    const { searchFilter } = useContext(FilterContext);

    const [ filteredDocuments, setFilteredDocuments ] = useState([]);

    useEffect(() => {
        const filter = documents.filter((doc) => {
            return doc.name.toLocaleLowerCase().includes(searchFilter)
        })
        setFilteredDocuments(filter);
    }, [searchFilter])

    return (
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Cliente</div>
                <div className='__col'>Estado</div>
                <div className='__col'>Tipo</div>
                <div className='__col'>Fecha</div>
            </div>
            <div className='__table_body'>
                {filteredDocuments.map((doc, index) => (
                    <Row key={doc.id} number={index + 1} name={doc.name} lastname={doc.lastname} email={doc.email} tipo={doc.type} status={doc.stauts} date={doc.date} />
                ))}
            </div>
        </div>
    );
}

export default Table;
