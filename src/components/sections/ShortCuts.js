import React from 'react'
import ShortCut from '../Cards/shortcuts/ShortCut'
import { IconCash, IconChartBar, IconCheckbox, IconUserCircle } from '@tabler/icons-react';
import ShortCutClient from '../Cards/shortcuts/ShortCutClient';
import ShortCutSales from '../Cards/shortcuts/ShortCutSales';
import ShortCutPedidos from '../Cards/shortcuts/ShortCutPedidos';

function ShortCuts() {

    return (
    
        <div className='__row_shortcuts'>
        
            <ShortCut icon={<IconCash/>} title={'Ingresos Totales'}/>
            <ShortCutClient icon={<IconUserCircle/>} title={'Clientes nuevo del último mes'} />
            <ShortCutSales icon={<IconChartBar/>} title={'Porcentaje de ventas en último mes'} />
            <ShortCutPedidos icon={<IconCheckbox/>} title={'Pedidos entregados'} />

        </div>
    
    )

}

export default ShortCuts