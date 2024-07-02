import React, { useContext } from 'react'
import DBContext from '../../../context/Data/DBContext';
import moment from 'moment';

function ShortCutSales({ icon, title }) {

    const { sales } = useContext(DBContext);

    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
    const endOfLastMonth = moment().subtract(1, 'months').endOf('month');

    // Filtrar las ventas del último mes
    const salesLastMonth = sales.filter(sale => {
        const saleDate = moment(sale.date);
        return saleDate.isBetween(startOfLastMonth, endOfLastMonth, null, '[]');
    });

    // Calcular el porcentaje de ventas del último mes
    const percentageLastMonth = sales.length > 0 
        ? (salesLastMonth.length / sales.length * 100).toFixed(2) 
        : 0;

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
                <h2>{percentageLastMonth}%</h2>
            </div>
        </div>
    )
}

export default ShortCutSales