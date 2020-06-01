import Box from '@material-ui/core/Box';
import { useRef, useState, useEffect, useMemo, useContext, useReducer } from 'react';
import Moment from 'moment';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import cleanStr from 'underscore.string/clean';
import { ContentBox, H2, P } from '../components/Typography';
import Layout from '../components/Layout';
import DateInput from '../components/location/DateInput';
import { UserContext } from '../components/User';
import LocationFormDialog from '../components/LocationFormDialog';
import Link from '../components/Link';
import ActionButton from '../components/ActionButton';
import CalendarTable from '../components/location/CalendarTable';
import MonthsChart from '../components/location/MonthsChart';
import YearsChart from '../components/location/YearsChart';
import YearTabs from '../components/location/YearTabs';
import DownloadButtons from '../components/location/DownloadButtons';
import UserFeedbackFormDialog from '../components/UserFeedbackFormDialog';

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
    const [showFeedback, setShowFeedback] = useState(false);
    const inputRef = useRef();

    const [modified, setModified] = useReducer((state, item) => {
        const key = JSON.stringify(item.key);
        const current = state[key];
        if ((item.status === 'sent' || item.status === 'error') && current !== 'sending') {
            return state;
        }
        return {
            ...state,
            [key]: item.status,
        };
    }, {});

    const getMeasurement = (y, m, d) =>
        data.records[y] !== undefined &&
        data.records[y][m + 1] !== undefined &&
        data.records[y][m + 1][d];

    const monthlyTotals = useMemo(
        () =>
            [...Array(12).keys()].map((m) =>
                Object.values((data.records[selectedDate.year] || {})[m + 1] || {}).reduce(
                    (acc, val) => (typeof val === 'number' ? acc + val : acc),
                    null,
                ),
            ),
        [data, selectedDate.year],
    );

    const yearMin = useMemo(
        () =>
            Math.min(
                ...Object.keys(data.records || {}).map((y) => parseInt(y, 10)),
                Moment().year(),
            ),
        [data],
    );

    const yearTotal = useMemo(() => monthlyTotals.reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), null), [monthlyTotals]);

    const yearLabels = useMemo(
        () => [...Array(Moment().year() - yearMin + 1).keys()].map((y) => yearMin + y),
        [yearMin],
    );

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

    const userIsOwner = useMemo(
        () => user && user.locations && user.locations.map((i) => i.id).includes(id),
        [user, id],
    );

    useEffect(() => {
        if (
            !showFeedback &&
            userIsOwner &&
            user.feedback_rating === null &&
            user.created_at &&
            Moment(user.created_at).isBefore(Moment().subtract(7, 'days'))
        ) {
            setShowFeedback(true);
        }
    }, [user, id]);

    const padZeros = (n, width) => {
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };

    const src = useMemo(
        () =>
            `//${userIsOwner ? process.env.apiHost : process.env.cacheHost}/locations/${padZeros(
                `${id}`,
                8,
            )}.json`,
        [user, id],
    );

    useEffect(() => {
        if (id === 0) {
            setData({
                title: 'Live Demo',
                records: randomData(Moment()),
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
            window.fetch(src, opt).then((response) => {
                if (response.ok) {
                    response.json().then((obj) => {
                        setData(obj);
                    });
                }
            });
        }
    }, [user, id]);

    const onDelete = () => {
        setUser(null);
        router.push('/user/');
    };

    function tdOnClick() {
        if (this !== null) {
            setSelectedDate(this);
            if (inputRef.current) inputRef.current.focus();
        }
    }

    return (
        <Layout title={cleanStr(data.title || 'Loading...')}>
            <ContentBox>
                <div style={{ textAlign: 'center' }}>
                    <H2>{cleanStr(data.title)}</H2>
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
                        <LocationFormDialog id={id} source={data} setSource={setData} />
                    )}
                    {showFeedback && (
                        <Box mt={1} component="div" style={{ display: 'block' }}>
                            <small>Feedback?</small>
                            <br />
                            <UserFeedbackFormDialog />
                        </Box>
                    )}
                </div>
                <Box mt={3}>
                    <YearTabs {...{ data, yearLabels, selectedDate, setSelectedDate }} />
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
                <Box mt={3}>
                    <CalendarTable
                        {...{
                            selectedDate,
                            monthlyTotals,
                            yearTotal,
                            modified,
                            getMeasurement,
                            onClick: tdOnClick,
                        }}
                    />
                </Box>
                <Box mt={3}>
                    <MonthsChart {...{ data, getMeasurement, monthlyTotals, selectedDate }} />
                </Box>
                <Box mt={3}>
                    {yearLabels.length > 1 && <YearsChart {...{ data, yearLabels }} />}
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                    <DownloadButtons src={src} />
                    {userIsOwner && (
                        <Box component="span" ml={2}>
                            <ButtonGroup size="small">
                                <ActionButton
                                    confirm="Really delete?"
                                    url={`/locations/${id}.json`}
                                    method="DELETE"
                                    onSuccess={onDelete}
                                    color="secondary"
                                >
                                    Delete Location
                                </ActionButton>
                            </ButtonGroup>
                        </Box>
                    )}
                </Box>
            </ContentBox>
        </Layout>
    );
};
