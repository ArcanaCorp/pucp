import React, { useContext, useEffect } from 'react'
import ShortCut from '../Cards/shortcuts/ShortCut'
import { IconCash, IconChartBar, IconCheckbox, IconUserCircle } from '@tabler/icons-react';
import DBContext from '../../context/Data/DBContext';
import ShortCutClient from '../Cards/shortcuts/ShortCutClient';

function ShortCuts() {

    const { shortCuts, handleGetShortcuts } = useContext(DBContext);

    useEffect(() => {
        if (shortCuts.length === 0) {
            handleGetShortcuts();
        }
    }, [shortCuts, handleGetShortcuts])

    return (
    
        <div className='__row_shortcuts'>
        
            <ShortCut icon={<IconCash/>} title={'Ingresos Totales'} number={shortCuts.total} />
            <ShortCutClient icon={<IconUserCircle/>} title={'Clientes nuevo del último mes'} />

        </div>
    
    )

}

export default ShortCuts