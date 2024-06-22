import React from 'react'
import FilterBar from '../../../components/Filters/FilterBar'
import Table from '../../../components/Tables/Quotes/Table'


import './styles/main.css'

function Main() {

    return (
    
        <div className='__main_quotes_view'>
            <FilterBar place={'quotes'} selectDate={true} selectType={false} selectSales={false} />
            <Table/>
        </div>
    
    )

}

export default Main