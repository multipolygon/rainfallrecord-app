import Box from '@material-ui/core/Box';
import { useState, useEffect, useMemo, useContext } from 'react';
import Moment from 'moment';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import cleanStr from 'underscore.string/clean';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';
import _range from 'lodash/range';
import _pickBy from 'lodash/pickBy';
import { ContentBox, H2, P } from '../components/Typography';
import Layout from '../components/Layout';
import { UserContext } from '../components/User';
import LocationFormDialog from '../components/LocationFormDialog';
import Link from '../components/Link';
import Table from '../components/location/Table';
import MonthsChart from '../components/location/MonthsChart';
import YearsChart from '../components/location/YearsChart';
import YearTabs from '../components/location/YearTabs';
import Footer from '../components/location/Footer';

const modes = {
    precipitation: 'Rainfall',
    temperatureMin: 'Min Temp',
    temperatureMax: 'Max Temp',
};

const numberOnly = (fn) => (acc, val) => (typeof val !== 'number' ? acc : fn(acc, val));

const modeReducer = {
    precipitation: numberOnly((acc, val) => acc + val),
    temperatureMin: numberOnly((acc, val) => (acc === null ? val : Math.min(acc, val))),
    temperatureMax: numberOnly((acc, val) => (acc === null ? val : Math.max(acc, val))),
};

export default () => {
    const router = useRouter();
    const [id, setId] = useState(null);
    const [user] = useContext(UserContext);
    const [mode, setMode] = useState('precipitation');
    const [year, setYear] = useState(Moment().year());
    const [data, setData] = useState({
        title: '[Loading]',
    });

    const decimals = useMemo(
        () =>
            Object.values(_get(data, [mode, year], {})).reduce(
                (a, m) =>
                    a === 3
                        ? a
                        : Object.values(m).reduce((b, v) => {
                              if (b < 3 && typeof v === 'number') {
                                  const n = Math.min((`${v}`.split('.')[1] || []).length, 3);
                                  if (n > b) return n;
                              }
                              return b;
                          }, a),
                0,
            ),
        [data, mode, year],
    );

    const toFixed = (val) => (typeof val === 'number' ? val.toFixed(decimals) : <>&nbsp;</>);

    const monthlyTotals = useMemo(
        () =>
            _pickBy(
                _mapValues(_get(data, [mode], {}), (months) =>
                    _pickBy(
                        _mapValues(months, (days) =>
                            Object.values(days || {}).reduce(modeReducer[mode], null),
                        ),
                        (v) => v !== null,
                    ),
                ),
                (v) => Object.keys(v).length !== 0,
            ),
        [data, mode],
    );

    const yearlyTotals = useMemo(
        () =>
            _mapValues(monthlyTotals, (months) =>
                Object.values(months).reduce(modeReducer[mode], null),
            ),
        [monthlyTotals],
    );

    const yearMin = useMemo(() => Math.min(year, Moment().year(), ...Object.keys(monthlyTotals)), [
        year,
        monthlyTotals,
    ]);

    const yearMax = Moment().year();

    const yearLabels = useMemo(() => _range(yearMin, yearMax + 1), [yearMin, yearMax]);

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
            const d = Math.ceil(
                Math.random() * (max.year() === y && max.month() + 1 === m ? max.date() : 30),
            );
            return {
                ...obj,
                [y]: {
                    ...(obj[y] || {}),
                    [m]: { ...(obj[m] || {}), [d]: parseFloat((Math.random() * 9.9).toFixed(1)) },
                },
            };
        }, {});

    const isDemo = useMemo(() => id === 0, [id]);

    const userIsOwner = useMemo(
        () => isDemo || (user && user.locations && user.locations.map((i) => i.id).includes(id)),
        [user, id],
    );

    const padZeros = (n, width) => {
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };

    const src = useMemo(
        () =>
            `//${userIsOwner ? process.env.apiHost : process.env.cacheHost}/locations/${padZeros(
                `${id}`,
                8,
            )}.json`,
        [userIsOwner, id],
    );

    useEffect(() => {
        if (isDemo) {
            setData({
                title: 'Live Demo',
                precipitation: randomData(Moment()),
                temperatureMin: randomData(Moment()),
                temperatureMax: randomData(Moment()),
            });
        } else if (user !== null && id !== null && typeof window === 'object') {
            const opt = userIsOwner
                ? {
                      cache: 'no-cache',
                      credentials: 'include',
                      mode: 'cors',
                  }
                : {
                      cache: 'default',
                      credentials: 'omit',
                      mode: 'cors',
                  };
            window
                .fetch(src, opt)
                .then((response) => (response.ok ? response.json() : null))
                .then((obj) => setData(obj))
                .catch(() => {});
        }
    }, [id, user, userIsOwner]);

    return (
        <Layout title={cleanStr(data.title || 'Loading...')}>
            <ContentBox>
                <div style={{ textAlign: 'center' }}>
                    <H2>{cleanStr(data.title)}</H2>
                    {isDemo && (
                        <P>
                            Data will not be saved!
                            <br />
                            <Link href="/user" as="/user">
                                Log in or sign up
                            </Link>{' '}
                            to start your own location record.
                        </P>
                    )}
                    {id !== null && !isDemo && (
                        <P>{[data.town_suburb, data.region].filter(Boolean).join(', ')}</P>
                    )}
                    {!isDemo && userIsOwner && (
                        <LocationFormDialog id={id} source={data} setSource={setData} />
                    )}
                </div>
                {process.env.showTemperature && (
                    <Box mt={3} style={{ textAlign: 'center' }}>
                        <ButtonGroup size="small">
                            {Object.keys(modes).map((m) => (
                                <Button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    variant={m === mode ? 'contained' : 'outlined'}
                                >
                                    {modes[m]}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                )}
                <Box mt={3}>
                    <YearTabs {...{ yearLabels, year, setYear, monthlyTotals }} />
                </Box>
                <Box mt={3}>
                    <Table
                        {...{
                            id,
                            data,
                            setData,
                            mode,
                            year,
                            monthlyTotals,
                            yearlyTotals,
                            toFixed,
                            userIsOwner,
                        }}
                    />
                </Box>
                <Box mt={3}>
                    <MonthsChart {...{ data, mode, year, monthlyTotals, modeReducer }} />
                </Box>
                <Box mt={3}>
                    {yearLabels.length > 1 && (
                        <YearsChart
                            {...{ data, mode, modeReducer, yearlyTotals, yearLabels, toFixed }}
                        />
                    )}
                </Box>
                {!isDemo && <Footer {...{ id, src, userIsOwner }} />}
            </ContentBox>
        </Layout>
    );
};
