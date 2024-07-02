import React, { useContext, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DBContext from '../../../../context/Data/DBContext'; // Ajusta la ruta según sea necesario
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartSalesC() {
    const { shoppings } = useContext(DBContext);

    // Calcular compras por insumo y mes
    const monthlyData = useMemo(() => {
        const initialData = {};

        shoppings.forEach(item => {
            const month = moment(item.fecha).month(); // Obtener el mes (0 a 11)
            if (!initialData[item.insumo]) {
                initialData[item.insumo] = Array(12).fill(0);
            }
            initialData[item.insumo][month] += parseFloat(item.total);
        });

        return initialData;
    }, [shoppings]);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Compra de insumos por mes',
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

    // Convertir datos a formato de datasets
    const datasets = Object.keys(monthlyData).map((insumo, index) => ({
        label: insumo,
        data: monthlyData[insumo],
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
    }));

    const data = {
        labels,
        datasets,
    };

    return (
        <Bar options={options} data={data} />
    );
}

export default ChartSalesC;