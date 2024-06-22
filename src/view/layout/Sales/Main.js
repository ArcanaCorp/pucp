import React from 'react'
import Table from '../../../components/Tables/Sales/Table'
import FilterBar from '../../../components/Filters/FilterBar'

import './styles/main.css'

function Main() {

    return (
    
        <div className='__main_quotes_view'>
            <FilterBar place={'sales'} />
            <Table/>
        </div>
    
    )

}

export default Main