import TextField from '@material-ui/core/TextField';
import { useEffect, useMemo } from 'react';
import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default ({ id, inputRef, date, setDate, data, setData, modified, setModified }) => {
    const isDateValid = (d) => {
        const m = Moment(d);
        return m.isValid() && m.isSameOrBefore(Moment(), 'day');
    };

    const isValid = useMemo(() => isDateValid(date), [date]);

    const getValue = (d) =>
        data.records[d.year] !== undefined &&
        data.records[d.year][d.month + 1] !== undefined &&
        data.records[d.year][d.month + 1][d.day];

    useEffect(() => {
        const v = getValue(date);
        /* eslint-disable no-param-reassign */
        inputRef.current.value = v === undefined ? '' : v;
        /* eslint-enable no-param-reassign */
    }, [data, date]);

    const onYearChange = (e) => setDate({ ...date, year: parseInt(e.target.value, 10) });

    const onMonthChange = (e) => setDate({ ...date, month: parseInt(e.target.value, 10) - 1 });

    const onDayChange = (e) => setDate({ ...date, day: parseInt(e.target.value, 10) });

    const nextDate = () => {
        const m = Moment(date).add(1, 'days');
        if (m.isSameOrBefore(Moment(), 'day'))
            setDate({ year: m.year(), month: m.month(), day: m.date() });
        inputRef.current.focus();
    };

    const submit = () => {
        const v =
            inputRef.current.value === '' ? undefined : parseFloat(inputRef.current.value, 10);
        setData({
            ...data,
            records: {
                ...data.records,
                [date.year]: {
                    ...(data.records[date.year] || {}),
                    [date.month + 1]: {
                        ...((data.records[date.year] || {})[date.month + 1] || {}),
                        [date.day]: v,
                    },
                },
            },
        });
        if (id !== 0) {
            setModified({ key: [date.year, date.month, date.day], status: 'pending' });
        }
        nextDate();
    };

    const onValKeyUp = (e) => {
        if (e.keyCode === 13) {
            submit();
        }
        return true;
    };

    useEffect(() => {
        if (Object.values(modified).includes('sending')) {
            // skip
        } else if (Object.values(modified).includes('pending')) {
            const [y, m, d] = JSON.parse(
                Object.keys(modified).filter((i) => modified[i] === 'pending')[0],
            );
            setModified({ key: [y, m, d], status: 'sending' });
            window
                .fetch(`//${process.env.apiHost}/locations/${id}/record.json`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        utf8: '✓',
                        record: {
                            date: [y, m + 1, d].join('-'),
                            measurement: `${getValue({ year: y, month: m, day: d })}`,
                        },
                    }),
                })
                .then((response) => {
                    setTimeout(() => {
                        if (response.ok) {
                            setModified({ key: [y, m, d], status: 'sent' });
                        } else {
                            setModified({ key: [y, m, d], status: 'error' });
                        }
                    }, 1000);
                })
                .catch(() => {
                    setTimeout(() => {
                        setModified({ key: [y, m, d], status: 'error' });
                    }, 1000);
                });
        }
    }, [modified]);

    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
            <Grid item>
                <TextField
                    label="Year"
                    type="number"
                    inputProps={{ min: 0, max: Moment().year(), step: 1 }}
                    value={date.year}
                    onChange={onYearChange}
                    error={!isValid}
                    variant="outlined"
                    size="small"
                    style={{ width: '7em' }}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Month"
                    type="number"
                    inputProps={{ min: 1, max: 12, step: 1 }}
                    value={date.month + 1}
                    onChange={onMonthChange}
                    error={!isValid}
                    variant="outlined"
                    size="small"
                    style={{ width: '7em' }}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Day"
                    type="number"
                    inputProps={{ min: 1, max: 31, step: 1 }}
                    value={date.day}
                    onChange={onDayChange}
                    error={!isValid}
                    variant="outlined"
                    size="small"
                    style={{ width: '7em' }}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Rainfall"
                    type="number"
                    inputProps={{ min: 0, max: 10000, step: 0.01 }}
                    autoFocus
                    inputRef={inputRef}
                    onKeyUp={onValKeyUp}
                    error={!isValid}
                    variant="outlined"
                    size="small"
                    style={{ width: '10em' }}
                />
            </Grid>
            <Grid item>
                <Button variant="outlined" onClick={submit}>
                    Set
                </Button>
            </Grid>
        </Grid>
    );
};
