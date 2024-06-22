import React from 'react'
import FilterBar from '../../../components/Filters/FilterBar'
import Table from '../../../components/Tables/Clients/Table'

import './styles/main.css'

function Main() {

    return (
    
        <div className='__main_quotes_view'>
            <FilterBar place={'clients'} />
            <Table/>
        </div>
    
    )

}

export default Main