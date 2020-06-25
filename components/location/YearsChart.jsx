import { useRef, useEffect, useMemo, useCallback } from 'react';
import Chart from 'chart.js';
import _get from 'lodash/get';
import { P } from '../Typography';

export default ({ yearlyTotals, yearLabels, toFixed }) => {
    const chart = useRef(null);

    const yearlyTotalsAry = useMemo(() => yearLabels.map((y) => _get(yearlyTotals, [y], 0)), [
        yearLabels,
        yearlyTotals,
    ]);

    const yearlyAverage = useMemo(
        () =>
            toFixed(
                yearlyTotalsAry.length === 0
                    ? 0
                    : yearlyTotalsAry.reduce((a, b) => a + b, 0) / yearlyTotalsAry.length,
            ),
        [yearlyTotalsAry],
    );

    const chartRef = useCallback((canvas) => {
        if (canvas) {
            chart.current = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: yearLabels,
                    datasets: [
                        {
                            data: yearlyTotalsAry,
                            // backgroundColor: '#f7e6b1ee',
                            // borderColor: '#edc240',
                            backgroundColor: '#bbbdd2',
                            borderColor: '#828193',
                            borderWidth: 1,
                            barPercentage: 1.0,
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
            chart.current.config.data.labels = yearLabels;
            chart.current.config.data.datasets[0].data = yearlyTotalsAry;
            chart.current.update();
        }
    }, [yearlyTotalsAry]);

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    height: '285px',
                }}
            >
                <canvas ref={chartRef} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <P>
                    <small>Annual average: {yearlyAverage}</small>
                </P>
            </div>
        </>
    );
};
