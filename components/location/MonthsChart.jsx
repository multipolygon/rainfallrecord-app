import { useRef, useEffect, useMemo, useCallback } from 'react';
import Chart from 'chart.js';
import Moment from 'moment';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';
import _range from 'lodash/range';

export default ({ year, monthlyTotals }) => {
    const chart = useRef(null);

    const labels = useMemo(() => _range(12).map((m) => Moment({ month: m }).format('MMM')), []);

    const monthlyTotalsAry = useMemo(
        () => _range(12).map((m) => _get(monthlyTotals, [year, m + 1], 0)),
        [monthlyTotals, year],
    );

    const monthlyAverages = useMemo(
        () =>
            _mapValues(
                Object.values(monthlyTotals).reduce(
                    (acc, months) =>
                        Object.keys(months).reduce(
                            (acc2, m) => ({ ...acc2, [m]: (acc2[m] || 0) + months[m] }),
                            acc,
                        ),
                    {},
                ),
                (v) => v / Object.keys(monthlyTotals).length,
            ),
        [monthlyTotals],
    );

    const monthlyAveragesAry = useMemo(
        () => _range(12).map((m) => _get(monthlyAverages, [m + 1], 0)),
        [monthlyAverages],
    );

    const chartRef = useCallback((canvas) => {
        if (canvas) {
            chart.current = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: year,
                            data: monthlyTotalsAry,
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
                            data: monthlyAveragesAry,
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
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem) => tooltipItem.yLabel.toFixed(2),
                        },
                    },
                },
            });
        }
    }, []);

    useEffect(() => {
        if (chart.current) {
            chart.current.config.data.datasets[0].label = year;
            chart.current.config.data.datasets[0].data = monthlyTotalsAry;
            chart.current.config.data.datasets[1].data = monthlyAveragesAry;
            chart.current.update();
        }
    }, [year, monthlyTotalsAry, monthlyAveragesAry]);

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
