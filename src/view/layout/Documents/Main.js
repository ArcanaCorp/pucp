import React from 'react'
import FilterBar from '../../../components/Filters/FilterBar'
import Table from '../../../components/Tables/Docs/Table'

import './styles/main.css'

function Main() {
    
    return (
    
        <div className='__main_doc_view'>

            <FilterBar place={'doc'} />

            <Table/>

        </div>
    
    )

}

export default Main