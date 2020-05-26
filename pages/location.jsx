import Box from '@material-ui/core/Box';
import { useRef, useState, useEffect, useMemo, useContext, useReducer } from 'react';
import Chart from 'chart.js';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { ContentBox, H2, P } from '../components/Typography';
import Layout from '../components/Layout';
import DateInput from '../components/DateInput';
import { UserContext } from '../components/User';
import LocationFormDialog from '../components/LocationFormDialog';
import Link from '../components/Link';
import ActionButton from '../components/ActionButton';

export default () => {
    const router = useRouter();
    const [id, setId] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        year: Moment().year(),
        month: Moment().month(),
        day: Moment().date(),
    });
    const [data, setData] = useState({ title: '[Loading]', records: {} });
    const yearChart = useRef(null);
    const allYearsChart = useRef(null);
    const inputRef = useRef();

    const [modified, setModified] = useReducer(
        (state, item) => {
            const key = JSON.stringify(item.key);
            const current = state[key];
            if ((item.status === 'sent' || item.status === 'error') && current !== 'sending') {
                return state;
            }
            return {
                ...state,
                [key]: item.status,
            };
        },
        {},
    );

    const getMeasurement = (y, m, d) =>
          data.records[y] !== undefined && data.records[y][m + 1] !== undefined && data.records[y][m + 1][d];

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

    const monthlyTotals = useMemo(
        () =>
            [...Array(12).keys()].map((m) =>
                                      Object.values((data.records[selectedDate.year] || {})[m + 1] || {}).reduce(
                                          (a, b) => a + b,
                                          0,
                                      ),
                                     ),
        [data, selectedDate.year],
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

    const monthlyTotalsTimeSeries = useMemo(
        () =>
            monthlyTotals.map((t, m) => ({
                t: Moment([selectedDate.year, m, 15]),
                y: t,
            })),
        [monthlyTotals],
    );

    const yearMin = useMemo(
        () =>
            Math.min(
                ...Object.keys(data.records || {}).map((y) => parseInt(y, 10)),
                Moment().year(),
            ),
        [data],
    );

    const yearTotal = useMemo(() => monthlyTotals.reduce((sum, d) => sum + d, 0), [monthlyTotals]);

    const yearLabels = useMemo(
        () => [...Array(Moment().year() - yearMin + 1).keys()].map((y) => yearMin + y),
        [yearMin],
    );

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

    useEffect(() => {
        allYearsChart.current.config.data.labels = yearLabels;
        allYearsChart.current.config.data.datasets[0].data = yearlyTotals;
        allYearsChart.current.update();
    }, [yearlyTotals, yearlyTotals]);

    useEffect(() => {
        const query = queryString.parse(router.asPath.split(/\?/)[1]);
        if (query.id) {
            setId(parseInt(query.id, 10));
        }
    }, []);

    const randomData = (max) =>
          [...Array(50).keys()].reduce((obj) => {
              const y = Math.ceil(Math.random() * 3) + max.year() - 3;
              const m = Math.ceil(Math.random() * (max.year() === y ? max.month() + 1 : 12));
              const d = Math.ceil(Math.random() * (max.year() === y ? max.date() : 30));
              return {
                  ...obj,
                  [y]: {
                      ...(obj[y] || {}),
                      [m]: { ...(obj[m] || {}), [d]: parseFloat((Math.random() * 50).toFixed(1)) },
                  },
              };
          }, {});

    const jsonSrc = useMemo(() => `//${process.env.apiHost}/locations/${id}.json`, [id]);

    const userIsOwner = useMemo(() => user && user.locations && user.locations.map((i) => i.id).includes(id), [user, id]);

    useEffect(() => {
        if (id === 0) {
            setData({
                title: 'Live Demo',
                records: randomData(Moment()),
            }); // TODO: Some random data
        } else if (id !== null && typeof window === 'object') {
            // TODO static:
            window.fetch(jsonSrc).then((response) => {
                if (response.ok) {
                    response.json().then((obj) => {
                        setData(obj);
                    });
                }
            });
        }
    }, [id]);

    const onDelete = () => {
        setUser(null);
        router.push("/user/");
    };

    function tdOnClick() {
        if (this !== null) {
            setSelectedDate(this);
            if (inputRef.current) inputRef.current.focus();
        }
    }

    const TdDate = ({ m, d }) => {
        const td = Moment([selectedDate.year, m, d]);
        const sd = Moment(selectedDate);
        const isValid = td.isValid() && td.isSameOrBefore(Moment(), 'day');
        const isActive = isValid && sd.isValid() && td.isSame(sd, 'day');
        const status = modified[JSON.stringify([selectedDate.year, m, d])];
        const measurement = isValid ? getMeasurement(selectedDate.year, m, d) : undefined;
        return (
            <td
                onClick={tdOnClick.bind(
                    isValid ? { year: selectedDate.year, month: m, day: d } : null,
                )}
                className={clsx(isValid ? 'date' : 'no-date', status, { active: isActive })}
            >
            {measurement !== undefined ? measurement : ' '}
            </td>
        );
    };

    return (
        <Layout title={data.title || 'Loading...'}>
            <ContentBox>
                <div style={{ textAlign: 'center' }}>
                    <H2>{data.title}</H2>
                    {id === 0 && (
                        <P>
                            Data will not be saved!
                            <br />
                            <Link href="/user" as="/user/">
                                Log in or sign up
                            </Link>{' '}
                            to start your own location record.
                        </P>
                    )}
                    {id !== null && id !== 0 && (
                        <P>{[data.town_suburb, data.region].filter(Boolean).join(', ')}</P>
                    )}
                    {userIsOwner && (
                        <>
                            <LocationFormDialog id={id} source={data} setSource={setData} />
                        </>
                    )}
                </div>
                <Box mt={3} style={{ textAlign: 'center', overflowX: 'auto' }}>
                    <ButtonGroup size="small">
                        {yearLabels.map((y) => (
                            <Button
                                key={y}
                                onClick={() => setSelectedDate({ ...selectedDate, year: y })}
                                variant={y === selectedDate.year ? 'contained' : 'outlined'}
                                disabled={data.records[y] === undefined}
                            >
                                {y}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
                {(id === 0 ||
                  (user && user.locations && user.locations.map((i) => i.id).includes(id))) && (
                      <Box mt={3}>
                          <DateInput
                              id={id}
                              inputRef={inputRef}
                              date={selectedDate}
                              setDate={setSelectedDate}
                              data={data}
                              setData={setData}
                              modified={modified}
                              setModified={setModified}
                          />
                      </Box>
                  )}
                <Box mt={3} style={{ overflowX: 'auto' }}>
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                <th className="month-label">{selectedDate.year}</th>
                                {[...Array(31).keys()].map((d) => (
                                    <th key={`th.day.${d}`}>{d + 1}</th>
                                ))}
                                <th className="total-month">∑</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(12).keys()].map((m) => (
                                <tr key={`tr.month${m}`}>
                                    <th className="month-label">
                                        {Moment({ month: m }).format('MMM')}
                                    </th>
                                    {[...Array(31).keys()].map((d) => (
                                        <TdDate key={`td.month.${m}.day.${d}`} m={m} d={d + 1} />
                                    ))}
                                    <td className="total-month">{monthlyTotals[m].toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td
                                    colSpan="32"
                                    style={{ textAlign: 'right', border: 0, fontWeight: 'bold' }}
                                >
                                    &nbsp;
                                </td>
                                <td style={{ textAlign: 'right' }}>{yearTotal.toFixed(2)}</td>
                            </tr>
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
                <Box mt={3} style={{ textAlign: 'center', overflowX: 'auto' }}>
                    <ButtonGroup size="small">
                        <Link component={Button} size="small" title="Download CSV File" href={jsonSrc.replace('.json', '.csv')}>CSV</Link>
                        <Link component={Button} size="small" title="Download JSON File" href={jsonSrc}>JSON</Link>
                    </ButtonGroup>
                    {userIsOwner &&
                     <Box component="span" ml={2}>
                         <ButtonGroup size="small">
                             <ActionButton confirm="Really delete?" url={`/locations/${id}.json`} method="DELETE" onSuccess={onDelete} color="secondary">
                                 Delete Location
                             </ActionButton>
                         </ButtonGroup> 
                     </Box>
                    }
                </Box>
            </ContentBox>
        </Layout>
    );
};
