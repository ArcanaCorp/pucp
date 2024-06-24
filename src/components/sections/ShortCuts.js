import React, { useContext, useEffect } from 'react'
import ShortCut from '../Cards/shortcuts/ShortCut'
import { IconCash, IconChartBar, IconCheckbox, IconUserCircle } from '@tabler/icons-react';
import DBContext from '../../context/Data/DBContext';

function ShortCuts() {

    const { shortCuts, handleGetShortcuts } = useContext(DBContext);

    useEffect(() => {
        if (shortCuts.length === 0) {
            handleGetShortcuts();
        }
    }, [shortCuts, handleGetShortcuts])

    return (
    
        <div className='__row_shortcuts'>
        
            <ShortCut icon={<IconCash/>} title={'Ingresos Totales'} />
            <ShortCut icon={<IconChartBar/>} title={'Porcentaje de Ventas en el último mes'} />
            <ShortCut icon={<IconUserCircle/>} title={'Clientes nuevos del último mes'} number={shortCuts.clients} />
            <ShortCut icon={<IconCheckbox/>} title={'Pedidos entregados'} />

        </div>
    
    )

}

export default ShortCuts