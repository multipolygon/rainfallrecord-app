import Box from '@material-ui/core/Box';
import { useRef, useState, useEffect, useMemo } from 'react';
import Chart from 'chart.js';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ContentBox, H2, H3 } from '../../components/Typography';
import Layout from '../../components/Layout';

const Page = ({id}) => {
    const src = `http://api.rainfallrecord.localhost/locations/${id}.json`;

    // Chart.defaults.global.elements.line.borderColor = '#558b2f88';
    // Chart.defaults.global.elements.line.backgroundColor = '#558b2f55';
    // Chart.defaults.global.elements.line.backgroundColor = '#F00';
    // Chart.defaults.global.animation.duration = 750;
    
    const [year, setYear] = useState(Moment().year());
    const [data, setData] = useState({ title: 'Loading...', records: {} });
    const yearChart = useRef(null);
    const allYearsChart = useRef(null);

    const getMeasurement = (y, m, d) =>
        data.records[y] &&
          data.records[y][m] &&
          data.records[y][m][d] ||
          ' ';

    const monthlyTotals = useMemo(
        () => 
            [...Array(12).keys()].map(
                (m) => 
                    Object.values((data.records[year]||{})[m+1]||{}).reduce((a, b) => a + b, 0)
            ),
        [data, year]
    );
    
    useEffect(() => {
        if (typeof window === 'object' && typeof window.L === 'object') {
            window.fetch(src).then((response) => {
                if (response.ok) {
                    response.json().then((obj) => {
                        setData(obj);
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if (data.records[year]) {
            const monthsData = monthlyTotals.map(
                (t, m) => ({
                    t: Moment([year, m, 15]),
                    y: t,
                })
            );

            const daysData = Object.keys(data.records[year]).reduce((acc, m) => (
                acc.concat(
                    Object.keys(data.records[year][m]).map((d) => (
                        {
                            t: Moment([year, m-1, d]),
                            y: data.records[year][m][d]
                        }
                    ))
                )
            ), []);

            const yearMin = Math.min(...Object.keys(data.records).map((y) => parseInt(y,10)));
            const yearMax = Math.max(...Object.keys(data.records).map((y) => parseInt(y,10)));
            const yearLables = [...Array(yearMax - yearMin + 1).keys()].map((y) => yearMin + y);

            const allYears = yearLables.map(
                (y) => 
                    Object.keys(data.records[y] || {}).reduce(
                        (acc, m) => acc + Object.values(data.records[y][m]).reduce((a, b) => a + b, 0),
                        0
                    )
            );

            if (yearChart.current === null) {
                yearChart.current = new Chart(
                    document.getElementById('yearChart'),
                    {
                        type: 'bar',
                        data: {
                            datasets: [
                                {
                                    data: monthsData,
                                    backgroundColor: "#f7e6b1",
				    borderColor: "#edc240",
                                    barPercentage: 2.7,
                                    order: 2,
                                    type: 'line',
                                    fill: false,
                                    cubicInterpolationMode: 'monotone',
                                },
                                {
                                    data: daysData,
                                    backgroundColor: "#bcdbed",
			            borderColor: "#afd8f8",
                                    barPercentage: 2,
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
                                            min: Moment([year, 0, 1]),
                                            max: Moment([year, 11, 31]),
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
                                            min: Moment([year, 0, 1]),
                                            max: Moment([year, 11, 31]),
                                        },
                                        time: {
                                            unit: 'day',
                                            displayFormats: {
                                                day: 'D',
                                            },
                                        },                                    
			            },
                                ],
			    },
                        },
                    }
                );
            } else {
                yearChart.current.config.data.datasets[0].data = monthsData;
                yearChart.current.config.data.datasets[1].data = daysData;
                yearChart.current.options.scales.xAxes.forEach((axes) => {
                    /* eslint-disable no-param-reassign */
                    axes.ticks.min = Moment([year, 0, 1]);
                    axes.ticks.max = Moment([year, 11, 31]);
                    /* eslint-enable no-param-reassign */
                });
                yearChart.current.update();
            }

            if (allYearsChart.current === null) {
                allYearsChart.current = new Chart(
                    document.getElementById('allYearsChart'),
                    {
                        type: 'bar',
                        data: {
                            datasets: [
                                {
                                    data: allYears,
                                    backgroundColor: "#f7e6b1",
				    borderColor: "#edc240",
                                    barPercentage: 1,
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
			        xAxes: [{
				    distribution: 'series',
                                }],
                            },
                        },
                    }
                );
            } else {
                allYearsChart.current.config.data.datasets[0].data = allYears;
                allYearsChart.current.update();
            }
        }
    }, [data, year]);
    
    return (
        <Layout title={data.title || 'Loading...'}>
            <ContentBox>
                <H2>{data.title}</H2>
                <Box mt={3}>
                    <ButtonGroup size="small">
                        {Object.keys(data.records).map((y) => (
                            <Button key={y} onClick={() => setYear(y)} variant={y === year ? 'contained' : 'outlined'}>
                                {y}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
                <H3>{year}</H3>
                <Box mt={3} style={{overflowX: 'auto'}}>
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                <th className="month-label">&nbsp;</th>
                                {[...Array(31).keys()].map((day) => (
                                    <th key={`th.day.${day}`}>{day+1}</th>
                                ))}
                                <th className="total-month">∑</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(12).keys()].map((month) => (
                                <tr key={`tr.month${month}`}>
                                    <th className="month-label">
                                        {Moment([year, month]).format('MMM')}
                                    </th>
                                    {[...Array(31).keys()].map((day) => (
                                        <td key={`td.month.${month}.day.${day}`} className={Moment([year, month, day+1]).isValid() ? 'date' : 'no-date'}>
                                            {getMeasurement(year, month+1, day+1)}
                                        </td>
                                    ))}
                                    <td className="total-month">
                                        {monthlyTotals[month].toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
                <Box mt={3}>
                    <div
                        style={{
                            position: 'relative',
                            height: '285px',
                            // maxHeight: '80vh',
                        }}
                    >
                        <canvas id="yearChart" />
                    </div>
                </Box>
                <Box mt={3}>
                    <div
                        style={{
                            position: 'relative',
                            height: '285px',
                            // maxHeight: '80vh',
                        }}
                    >
                        <canvas id="allYearsChart" />
                    </div>
                </Box>
            </ContentBox>
        </Layout>
    );
}

Page.getInitialProps = async function loadData(context) {
    const { id } = context.query;
    return { id };
};

export default Page;
