import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function ChartSalesC() {

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Compra de insumos',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
      
    const labels = ['ENE', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];
    
    const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const data = {
        labels,
        datasets: [
            {
                label: 'Branding',
                data: labels.map(() => generateRandomNumber(100, 1000000)),
                backgroundColor: 'rgba(49, 49, 136, 1)',
            },
            {
                label: 'Website',
                data: labels.map(() => generateRandomNumber(100, 1000000)),
                backgroundColor: '#00195A',
            },
            {
                label: 'Mantenimiento',
                data: labels.map(() => generateRandomNumber(100, 1000000)),
                backgroundColor: '#8CDDF5',
            },
        ],
    };
    
    return (
    
        <Bar options={options} data={data} />
    
    )

}

export default ChartSalesC