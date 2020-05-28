import { useRef, useEffect, useMemo } from 'react';
import Chart from 'chart.js';

export default ({ data, yearLabels }) => {
    const allYearsChart = useRef(null);

    const yearlyTotals = useMemo(
        () =>
            yearLabels.map((y) =>
                Object.keys(data.records[y] || {}).reduce(
                    (acc, m) => acc + Object.values(data.records[y][m]).reduce((a, b) => a + b, 0),
                    0,
                ),
            ),
        [data, yearLabels],
    );

    useEffect(() => {
        allYearsChart.current = new Chart(document.getElementById('allYearsChart'), {
            type: 'bar',
            data: {
                datasets: [
                    {
                        data: [],
                        backgroundColor: '#f7e6b1',
                        borderColor: '#edc240',
                    },
                ],
                labels: Object.keys(data.records),
            },
            options: {
                // responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            distribution: 'series',
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }, []);

    useEffect(() => {
        allYearsChart.current.config.data.labels = yearLabels;
        allYearsChart.current.config.data.datasets[0].data = yearlyTotals;
        allYearsChart.current.update();
    }, [yearlyTotals, yearlyTotals]);

    return (
        <div
            style={{
                position: 'relative',
                height: '285px',
            }}
        >
            <canvas id="allYearsChart" />
        </div>
    );
};
