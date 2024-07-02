import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DBContext from '../../../../context/Data/DBContext';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartQuotes() {
    const { quotes } = useContext(DBContext);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Porcentaje',
                data: [],
                backgroundColor: [
                    'rgba(49, 49, 136, 1)',
                    'rgba(54, 162, 235, 1)',
                    '#00195A',
                    '#8CDDF5',
                ],
            },
        ],
    });

    useEffect(() => {
        if (quotes.length > 0) {
            const monthsData = calculateMonthsData(quotes);
            updateChartData(monthsData);
        }
    }, [quotes]);

    const calculateMonthsData = (quotes) => {
        const monthsMap = {};
        quotes.forEach((quote) => {
            const month = moment(quote.date).format('MMMM');
            if (monthsMap[month]) {
                monthsMap[month]++;
            } else {
                monthsMap[month] = 1;
            }
        });

        const months = Object.keys(monthsMap);
        const totalCount = quotes.length;
        const percentages = months.map((month) => ((monthsMap[month] / totalCount) * 100).toFixed(2));

        return { months, percentages };
    };

    const updateChartData = (monthsData) => {
        const { months, percentages } = monthsData;
        setData({
            labels: months,
            datasets: [
                {
                    label: 'Porcentaje',
                    data: percentages,
                    backgroundColor: [
                        'rgba(49, 49, 136, 1)',
                        'rgba(54, 162, 235, 1)',
                        '#00195A',
                        '#8CDDF5',
                    ],
                },
            ],
        });
    };

    return <Doughnut data={data} />;
}

export default ChartQuotes;
