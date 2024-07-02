import React, { useContext, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import DBContext from '../../../../context/Data/DBContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function ChartSalesB() {
    const { sales } = useContext(DBContext);

    // Calcular ingresos por mes
    const monthlySales = useMemo(() => {
        const monthlyTotals = Array(12).fill(0); // Inicializar un array de 12 elementos en 0

        sales.forEach(sale => {
            const month = moment(sale.date).month(); // Obtener el mes (0 a 11)
            monthlyTotals[month] += parseFloat(sale.total); // Sumar el total de la venta al mes correspondiente
        });

        return monthlyTotals;
    }, [sales]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ingresos por mes',
            },
        },
    };

    const labels = ['ENE', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Ingresos por mes',
                data: monthlySales,
                borderColor: 'rgb(49, 50, 126)',
                backgroundColor: 'rgba(49, 50, 126, 1)',
            }
        ],
    };
    
    return (
        <Bar options={options} data={data} />
    );
}

export default ChartSalesB;
