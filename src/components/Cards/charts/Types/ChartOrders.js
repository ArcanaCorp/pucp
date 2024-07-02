import React, { useContext, useEffect, useState } from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DBContext from '../../../../context/Data/DBContext';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartOrders() {

    const { sales } = useContext(DBContext);
    const [ orderStatusCounts, setOrderStatusCounts] = useState({});

    useEffect(() => {
        if (sales.length > 0) {
            const counts = {
                Recibido: 0,
                Proceso: 0,
                Entregados: 0,
                Finalizado: 0,
            };

            sales.forEach((order) => {
                switch (order.status) {
                    case '0':
                        counts.Recibido++;
                        break;
                    case '1':
                        counts.Proceso++;
                        break;
                    case '2':
                        counts.Entregados++;
                        break;
                    case '3':
                        counts.Finalizado++;
                        break;
                    default:
                        break;
                }
            });

            setOrderStatusCounts(counts);
        }
    }, [sales]);

    // Calcular porcentajes
    const totalOrders = sales.length;
    const percentages = {
        Recibido: (orderStatusCounts.Recibido / totalOrders) * 100,
        Proceso: (orderStatusCounts.Proceso / totalOrders) * 100,
        Entregados: (orderStatusCounts.Entregados / totalOrders) * 100,
        Finalizado: (orderStatusCounts.Finalizado / totalOrders) * 100,
    };

    const data = {
        labels: ['Recibido', 'Proceso', 'Entregados', 'Finalizado'],
        datasets: [
            {
                label: 'Porcentaje',
                data: [
                    percentages.Recibido || 0,
                    percentages.Proceso || 0,
                    percentages.Entregados || 0,
                    percentages.Finalizado || 0,
                ],
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