import React, { useContext } from 'react'

import './shortcut.css'
import DBContext from '../../../context/Data/DBContext'

function ShortCut({ icon, title }) {

    const { sales } = useContext(DBContext);

    const totalSales = sales.reduce((acc, sale) => acc + parseFloat(sale.total), 0).toFixed(2);

    return (
    
        <div className='__card_shortcut'>
            <div className='__row_card_shortcut __row_card_shortcut_A'>
                <div className='__ico'>
                    {icon}
                </div>
            </div>
            <div className='__row_card_shortcut __row_card_shortcut_B'>
                <p>{title}</p>
            </div>
            <div className='__row_card_shortcut'>
                <h2>s/. {totalSales}</h2>
            </div>
        </div>
    
    )

}

export default ShortCut