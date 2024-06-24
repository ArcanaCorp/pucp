import React from 'react'
import FilterBar from '../../../components/Filters/FilterBar'
import Table from '../../../components/Tables/Sales/Table'

import './styles/main.css'

function Main() {

    return (
    
        <div className='__main_order_view'>

            <FilterBar place={'orders'} selectDate={true} selectType={true} selectSales={false} selectDocs={false} />
            
            <Table/>
            
        </div>
    
    )

}

export default Main