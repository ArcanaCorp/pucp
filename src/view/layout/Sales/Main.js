import React from 'react'
import Table from '../../../components/Tables/Orders/Table'
import FilterBar from '../../../components/Filters/FilterBar'

import './styles/main.css'

function Main() {

    return (
    
        <div className='__main_quotes_view'>
            <FilterBar place={'sales'} selectDate={true} selectType={false} selectSales={true} />
            <Table/>
        </div>
    
    )

}

export default Main