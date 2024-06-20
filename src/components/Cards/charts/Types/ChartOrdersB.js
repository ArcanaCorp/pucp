import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function ChartOrdersB() {

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
                data: [300, 500, 100, 700, 200, 1000, 400, 300, 500, 100, 700, 200],
                borderColor: 'rgb(49, 50, 126)',
                backgroundColor: 'rgba(49, 50, 126, 1)',
            }
        ],
    };

    return (

        <Bar options={options} data={data} />
    
    )

}

export default ChartOrdersB