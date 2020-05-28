import { useRef, useEffect, useMemo } from 'react';
import Chart from 'chart.js';
import Moment from 'moment';

export default ({ data, getMeasurement, monthlyTotals, selectedDate }) => {
    const yearChart = useRef(null);

    const daysTimeSeries = useMemo(
        () =>
            [...Array(12).keys()].reduce(
                (acc, m) =>
                    acc.concat(
                        [...Array(31).keys()]
                            .map((d) => {
                                const t = Moment([selectedDate.year, m, d]);
                                return t.isValid()
                                    ? {
                                          t,
                                          y: getMeasurement(selectedDate.year, m, d) || 0,
                                      }
                                    : null;
                            })
                            .filter((i) => i !== null),
                    ),
                [],
            ),
        [data, selectedDate.year],
    );

    const monthlyTotalsTimeSeries = useMemo(
        () =>
            monthlyTotals.map((t, m) => ({
                t: Moment([selectedDate.year, m, 15]),
                y: t,
            })),
        [monthlyTotals],
    );

    const yAxesMax = useMemo(
        () =>
            Object.keys(data.records).reduce(
                (max, y) =>
                    Object.keys(data.records[y]).reduce(
                        (max2, m) =>
                            Math.max(
                                Object.values(data.records[y][m]).reduce((sum, d) => sum + d, 0),
                                max2,
                            ),
                        max,
                    ),
                10,
            ),
        [monthlyTotals],
    );

    useEffect(() => {
        yearChart.current = new Chart(document.getElementById('yearChart'), {
            type: 'bar',
            data: {
                datasets: [
                    {
                        data: [],
                        backgroundColor: '#f7e6b1',
                        borderColor: '#edc240',
                        order: 2,
                        type: 'line',
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                    },
                    {
                        data: [],
                        backgroundColor: '#bcdbed',
                        borderColor: '#afd8f8',
                        order: 1,
                    },
                ],
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
                            type: 'time',
                            distribution: 'linear',
                            ticks: {
                                min: Moment([selectedDate.year, 0, 1]),
                                max: Moment([selectedDate.year, 11, 31]),
                            },
                            time: {
                                unit: 'month',
                                displayFormats: {
                                    month: 'MMM',
                                },
                            },
                        },
                        {
                            display: false,
                            gridLines: {
                                display: false,
                                drawTicks: false,
                            },
                            type: 'time',
                            distribution: 'linear',
                            ticks: {
                                min: Moment([selectedDate.year, 0, 1]),
                                max: Moment([selectedDate.year, 11, 31]),
                            },
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'D',
                                },
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: yAxesMax,
                            },
                        },
                        {
                            display: false,
                            ticks: {
                                min: 0,
                                max: yAxesMax,
                            },
                        },
                    ],
                },
            },
        });
    }, []);

    useEffect(() => {
        yearChart.current.config.data.datasets[0].data = monthlyTotalsTimeSeries;
        yearChart.current.config.data.datasets[1].data = daysTimeSeries;
        yearChart.current.options.scales.xAxes.forEach((axes) => {
            /* eslint-disable no-param-reassign */
            axes.ticks.min = Moment([selectedDate.year, 0, 1]);
            axes.ticks.max = Moment([selectedDate.year, 11, 31]);
            /* eslint-enable no-param-reassign */
        });
        yearChart.current.options.scales.yAxes.forEach((axes) => {
            /* eslint-disable no-param-reassign */
            axes.ticks.max = yAxesMax;
            /* eslint-enable no-param-reassign */
        });
        yearChart.current.update();
    }, [selectedDate, monthlyTotalsTimeSeries, daysTimeSeries]);

    return (
        <div
            style={{
                position: 'relative',
                height: '285px',
            }}
        >
            <canvas id="yearChart" />
        </div>
    );
};
