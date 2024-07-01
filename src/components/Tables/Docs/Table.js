import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../../../context/Filter/FilterContext';
import DBContext from '../../../context/Data/DBContext';

import Row from './Row';

import './table.css';

function Table() {

    const { docs } = useContext(DBContext);
    const { searchFilter } = useContext(FilterContext);

    console.log(searchFilter);

    const [ filteredDocuments, setFilteredDocuments ] = useState([]);

    useEffect(() => {
        if (docs.length > 0) {
            setFilteredDocuments(docs);
        }
    }, [docs])

    return (
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
    );
}

export default Table;
