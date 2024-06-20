import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartQuotes() {

    const data = {
        labels: ['Junio', 'Julio', 'Agosto', 'Septiembre'],
        datasets: [
            {
                label: 'Porcentaje',
                data: [18.2, 27.3, 36.4, 18.2],
                backgroundColor: [
                    'rgba(49, 49, 136, 1)',
                    'rgba(54, 162, 235, 1)',
                    '#00195A',
                    '#8CDDF5',
                ]
            },
        ],
    };

    return (
    
        <Doughnut data={data} />
    
    )

}

export default ChartQuotes