import React from 'react'
import './filts.css'
import SearchBox from './SearchBox'
import Selects from './Selects'

function FilterBar() {
    
    return (
    
        <div className='__filter_bar'>
            <Selects types={true} />
            <SearchBox placeholder={'Buscar'} />
        </div>
    
    )

}

export default FilterBar