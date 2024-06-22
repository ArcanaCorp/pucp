import React from 'react'
import './filts.css'
import SearchBox from './SearchBox'
import Selects from './Selects'

function FilterBar({ place, selectDate, selectType, selectSales, selectDocs }) {
    
    return (
    
        <div className='__filter_bar'>
            <Selects date={selectDate} types={selectType} sales={selectSales} docs={selectDocs} />
            <SearchBox place={place} placeholder={'Buscar'} />
        </div>
    
    )

}

export default FilterBar