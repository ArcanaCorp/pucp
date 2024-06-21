import React from 'react'
import FilterBar from '../../../components/Filters/FilterBar'
import Table from '../../../components/Tables/Orders/Table'

import './styles/main.css'

function Main() {

    return (
    
        <div className='__main_order_view'>
            <FilterBar/>
            
            <Table/>
        </div>
    
    )

}

export default Main