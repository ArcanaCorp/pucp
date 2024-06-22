import { IconSearch } from '@tabler/icons-react'
import React, { useContext } from 'react'

import './filts.css'
import FilterContext from '../../context/Filter/FilterContext'

function SearchBox({ placeholder }) {

    const { handleFilterSearch } = useContext(FilterContext);

    const handleSearching = (e) => {
        const searchValue = e.target.value.trim();
        handleFilterSearch(searchValue)
        const params = new URLSearchParams(window.location.search);
    
        if (searchValue) {
            params.set('search', searchValue); // Añade el parámetro 'query' con el valor de búsqueda
        } else {
            params.delete('search'); // Elimina el parámetro 'query' si el valor de búsqueda está vacío
            handleFilterSearch('')
        }
    
        // Actualiza la URL con los nuevos parámetros
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
    

    return (
       
        <>
            <div className='__searchbox'>
                <input type='text' name='search' id='search' placeholder={placeholder} onChange={(e) => handleSearching(e)} />
                <span><IconSearch/></span>
            </div>
        </>
    
    )
}

export default SearchBox