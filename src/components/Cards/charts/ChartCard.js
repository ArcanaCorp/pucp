import React from 'react'
import ChartOrders from './Types/ChartOrders'
import ChartSales from './Types/ChartSales'
import ChartOrdersB from './Types/ChartOrdersB'
import ChartQuotes from './Types/ChartQuotes'
import ChartSalesB from './Types/ChartSalesB'
import ChartSalesC from './Types/ChartSalesC'

import './chart.css'

function ChartCard({ bg, title, chart }) {

    return (

        <div className={`__card_chart ${bg && '__card_chart_bg'}`}>
            <div>
                <h4>{title}</h4>
            </div>
            <div className='__line'></div>
            <div>
                {chart === 'ordersA' && ( <ChartOrders/> )}
                {chart === 'salesA' && ( <ChartSales/> )}
                {chart === 'ordersB' && ( <ChartOrdersB/> )}
                {chart === 'quotes' && ( <ChartQuotes/> )}
                {chart === 'salesB' && ( <ChartSalesB/> )}
                {chart === 'salesC' && ( <ChartSalesC/> )}
            </div>
        </div>
    
    )

}

export default ChartCard