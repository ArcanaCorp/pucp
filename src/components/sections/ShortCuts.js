import React from 'react'
import ShortCut from '../Cards/shortcuts/ShortCut'
import { IconCash, IconChartBar, IconCheckbox, IconUserCircle } from '@tabler/icons-react';

function ShortCuts() {

    const shortcutsList = [
        {
            icon: <IconCash/>,
            title: 'Ingresos Totales',
            number: 's/. 250.000.00'
        },
        {
            icon: <IconChartBar/>,
            title: 'Porcentaje de ventas en el último mes',
            number: '36.2%'
        },
        {
            icon: <IconUserCircle/>,
            title: 'Nuevos clientes en el último mes',
            number: '36'
        },
        {
            icon: <IconCheckbox/>,
            title: 'Pedidos entregado',
            number: '29'
        }
    ];

    return (
    
        <div className='__row_shortcuts'>
        
            {shortcutsList.map((short, i) => (
                <ShortCut key={i} shortcut={short} />
            ))}

        </div>
    
    )

}

export default ShortCuts