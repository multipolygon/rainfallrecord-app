import { useRef, useEffect, useMemo, useCallback } from 'react';
import Chart from 'chart.js';
import Moment from 'moment';

export default ({ data, monthlyTotals, selectedDate }) => {
    const chart = useRef(null);

    const labels = useMemo(
        () => [...Array(12).keys()].map((m) => Moment({ month: m }).format('MMM')),
        [],
    );

    const years = useMemo(() => {
        const y = Moment().format('Y');
        return Object.keys(data.records).filter((i) => i !== y);
    }, [data]);

    const monthlyAverages = useMemo(() => {
        const arr = Array(12).fill(0);
        const l = years.length;
        if (l > 0) {
            years.forEach((y) => {
                Object.keys(data.records[y]).forEach((m) => {
                    arr[m - 1] += Object.values(data.records[y][m]).reduce((sum, d) => sum + d, 0);
                });
            });
            return arr.map((i) => Math.round((i / l) * 100) / 100);
        }
        return arr;
    }, [years]);

    const chartRef = useCallback((canvas) => {
        if (canvas) {
            chart.current = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: selectedDate.year,
                            data: monthlyTotals,
                            // backgroundColor: '#f7e6b1ee',
                            // borderColor: '#edc240',
                            backgroundColor: '#bbbdd2',
                            borderColor: '#828193',
                            borderWidth: 1,
                            order: 1,
                            barPercentage: 0.8,
                        },
                        {
                            label: 'Average',
                            data: monthlyAverages,
                            // backgroundColor: '#bcdbed',
                            // borderColor: '#afd8f8',
                            backgroundColor: '#f7e6b1ee',
                            borderColor: '#edc240',
                            borderWidth: 1,
                            order: 2,
                            barPercentage: 1.0,
                        },
                    ],
                },
                options: {
                    // responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                                id: 'bar-x-axis1',
                            },
                            {
                                display: false,
                                stacked: true,
                                id: 'bar-x-axis2',
                                // these are needed because the bar controller defaults set only the first x axis properties
                                type: 'category',
                                categoryPercentage: 0.8,
                                barPercentage: 0.9,
                                gridLines: {
                                    display: false,
                                    drawTicks: false,
                                    offsetGridLines: true,
                                },
                                offset: true,
                            },
                        ],
                        yAxes: [
                            {
                                stacked: false,
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                            {
                                display: false,
                            },
                        ],
                    },
                },
            });
        }
    }, []);

    useEffect(() => {
        if (chart.current) {
            chart.current.config.data.datasets[0].label = selectedDate.year;
            chart.current.config.data.datasets[0].data = monthlyTotals;
            chart.current.config.data.datasets[1].data = monthlyAverages;
            chart.current.update();
        }
    }, [monthlyTotals]);

    return (
        <div
            style={{
                position: 'relative',
                height: '285px',
            }}
        >
            <canvas ref={chartRef} />
        </div>
    );
};
