import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartOrders() {

    const data = {
        labels: ['Recibido', 'Proceso', 'Entregados', 'Finalizado'],
        datasets: [
            {
                label: 'Porcentaje',
                data: [57.1, 0, 0, 0],
                backgroundColor: [
                    'rgba(136, 136, 136)',
                    'rgba(206, 185, 0)',
                    'rgba(58, 206, 0)',
                    'rgba(33, 150, 243)',
                ]
            },
        ],
    };

    return (
    
        <Doughnut data={data} />
    
    )

}

export default ChartOrders