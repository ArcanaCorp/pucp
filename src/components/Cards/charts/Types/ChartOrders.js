import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartOrders() {

    const data = {
        labels: ['Entregados', 'Proceso'],
        datasets: [
            {
                label: 'Porcentaje',
                data: [57.1, 42.9],
                backgroundColor: [
                    'rgba(49, 50, 126, 1)',
                    'rgba(54, 162, 235, 0.2)',
                ]
            },
        ],
    };

    return (
    
        <Doughnut data={data} />
    
    )

}

export default ChartOrders