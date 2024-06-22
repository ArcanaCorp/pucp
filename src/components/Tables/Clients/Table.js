import React, { useContext, useEffect, useState } from 'react'
import { clientsData } from "../../../data/clientsData";
import Row from './Row';
import FilterContext from '../../../context/Filter/FilterContext';

function Table() {

    const { searchFilter } = useContext(FilterContext);

    const [ filteredClients, setFilteredClients ] = useState([]);

    useEffect(() => {
        if (searchFilter.table === 'clients') {
            const filter = clientsData.filter((odr) => {
                return (
                    odr.name.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.ruc20.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.contacto.toLocaleLowerCase().includes(searchFilter.query) ||
                    odr.direccion.toLocaleLowerCase().includes(searchFilter.query)
                );
            })
            setFilteredClients(filter);   
        } else {
            setFilteredClients(clientsData)
        }
    }, [searchFilter])
    
    return (
    
        <div className='__table'>
            <div className='__table_head'>
                <div className='__col __col_nmb'>N°</div>
                <div className='__col'>Razón social</div>
                <div className='__col'>RUC</div>
                <div className='__col'>Contacto</div>
                <div className='__col'>Dirección</div>
            </div>
            <div className='__table_body'>
                {filteredClients.map((client, idc) => (
                    <Row key={idc} number={idc + 1} company={client} />
                ))}
            </div>
        </div>
    
    )

}

export default Table