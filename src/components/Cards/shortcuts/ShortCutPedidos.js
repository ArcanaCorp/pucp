import React, { useContext } from 'react'
import DBContext from '../../../context/Data/DBContext'

function ShortCutPedidos({ icon, title }) {

    const { sales } = useContext(DBContext);
    const countSalesWithStatusTwo = () => {
        return sales.filter(sale => sale.status === "2").length;
    };

    const count = countSalesWithStatusTwo();

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
                <h2>{count}</h2>
            </div>
        </div>
    )
}

export default ShortCutPedidos