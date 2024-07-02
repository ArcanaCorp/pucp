import React, { useContext, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import DBContext from '../../../../context/Data/DBContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function ChartSales() {
    const { sales } = useContext(DBContext);

    // Calcular ventas por mes
    const monthlySalesCount = useMemo(() => {
        const monthlyCounts = Array(12).fill(0); // Inicializar un array de 12 elementos en 0

        sales.forEach(sale => {
            const month = moment(sale.date).month(); // Obtener el mes (0 a 11)
            monthlyCounts[month] += 1; // Incrementar el contador de ventas del mes correspondiente
        });

        return monthlyCounts;
    }, [sales]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ventas por mes',
            },
        },
    };

    const labels = ['ENE', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Ventas por mes',
                data: monthlySalesCount,
                borderColor: 'rgb(49, 50, 126)',
                backgroundColor: 'rgba(49, 50, 126, 1)',
            }
        ],
    };
    
    return (
        <Bar options={options} data={data} />
    );
}

export default ChartSales;
