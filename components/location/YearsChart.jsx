import { useRef, useEffect, useMemo, useCallback } from 'react';
import Chart from 'chart.js';
import { P } from '../Typography';

export default ({ data, yearLabels, toFixed }) => {
    const chart = useRef(null);

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

    const yearlyTotalsNonZero = useMemo(
        () =>
            (yearlyTotals || [])
                .slice(0, -1) // remove current year
                .filter((n) => typeof n === 'number' && n > 0),
        [yearlyTotals],
    );

    const yearlyAverage = useMemo(
        () =>
            toFixed(
                yearlyTotalsNonZero.length === 0
                    ? 0
                    : yearlyTotalsNonZero.reduce((a, b) => a + b, 0) / yearlyTotalsNonZero.length,
            ),
        [yearlyTotalsNonZero],
    );

    const chartRef = useCallback((canvas) => {
        if (canvas) {
            chart.current = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: yearLabels,
                    datasets: [
                        {
                            data: yearlyTotals,
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
                },
            });
        }
    }, []);

    useEffect(() => {
        if (chart.current) {
            chart.current.config.data.labels = yearLabels;
            chart.current.config.data.datasets[0].data = yearlyTotals;
            chart.current.update();
        }
    }, [yearlyTotals]);

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
