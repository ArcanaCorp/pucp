import React, { useContext, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import DBContext from '../../../../context/Data/DBContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function ChartOrdersB() {
    const { sales } = useContext(DBContext);

    // Calcular pedidos por mes
    const monthlyOrderCount = useMemo(() => {
        const monthlyCounts = Array(12).fill(0); // Inicializar un array de 12 elementos en 0

        sales.forEach(sale => {
            const month = moment(sale.date_finish).month(); // Obtener el mes (0 a 11)
            monthlyCounts[month] += 1; // Incrementar el contador de pedidos del mes correspondiente
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
                text: 'Pedidos por mes',
            },
        },
    };

    const labels = ['ENE', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Pedidos por mes',
                data: monthlyOrderCount,
                borderColor: 'rgb(49, 50, 126)',
                backgroundColor: 'rgba(49, 50, 126, 1)',
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    );
}

export default ChartOrdersB;
