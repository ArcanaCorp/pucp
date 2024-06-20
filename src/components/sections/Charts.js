import React from 'react'
import ChartCard from '../Cards/charts/ChartCard'

function Charts() {

    return (
    
        <div className='__row_charts'>
            <div className='__row_chart_wrap'>
                <ChartCard bg={true} title={'Pedidos en proceso y entregados'} chart={'ordersA'} />
                <div className='__row_charts_group'>
                    <ChartCard bg={false} title={'Ventas por mes (miles de unidades)'} chart={'salesA'} />
                    <ChartCard bg={false} title={'Pedidos'} chart={'ordersB'} />
                </div>
            </div>
            <div className='__row_chart_wrap'>
                <ChartCard bg={true} title={'Cotizaciones en el mes'} chart={'quotes'} />
                <div className='__row_charts_group'>
                    <ChartCard bg={false} title={'Ingresos por mes'} chart={'salesB'} />
                    <ChartCard bg={false} title={'Compra de insumos'} chart={'salesC'} />
                </div>
            </div>
        </div>
    
    )

}

export default Charts