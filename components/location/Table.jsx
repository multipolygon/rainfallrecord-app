import Hidden from '@material-ui/core/Hidden';
import { useState, useEffect, useReducer } from 'react';
import Moment from 'moment';
import _get from 'lodash/get';
import _set from 'lodash/set';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import TableLandscape from './TableLandscape';
import TablePortrait from './TablePortrait';

const patchReducer = (state, patch) => ({ ...state, ...patch });

const today = Moment();

export default ({
    id,
    data,
    setData,
    mode,
    year,
    monthlyTotals,
    yearlyTotals,
    toFixed,
    userIsOwner,
}) => {
    const [modified, setModified] = useReducer(patchReducer, {});
    const [alert, setAlert] = useState(true);

    const modifiedKey = (y, m, d) => JSON.stringify([y, m, d]);

    const updateModified = (y, m, d, status) => {
        const key = modifiedKey(y, m, d);
        const current = modified[key];
        if ((status === 'sent' || status === 'error') && current !== 'sending') {
            // skip
        }
        setModified({
            [key]: status,
        });
    };

    const setMeasurement = (y, m, d, t) => {
        let v = t === '' ? undefined : parseFloat(t) || 0;
        if (typeof v === 'number' && mode === 'precipitation' && v < 0) {
            v *= -1;
        }
        if (_get(data, [mode, year, m, d]) !== v) {
            setData(_set({ ...data }, [mode, y, m, d], v));
            if (id !== 0) {
                updateModified(y, m, d, 'pending');
            }
        }
    };

    const onBlur = (e) =>
        setMeasurement(
            year,
            parseInt(e.target.getAttribute('data-m'), 10),
            parseInt(e.target.getAttribute('data-d'), 10),
            e.target.innerText.trim(),
        );

    useEffect(() => {
        if (Object.values(modified).includes('sending')) {
            // skip
        } else if (Object.values(modified).includes('pending')) {
            const [y, m, d] = JSON.parse(
                Object.keys(modified).filter((i) => modified[i] === 'pending')[0],
            );
            updateModified(y, m, d, 'sending');
            const body = {
                utf8: '✓',
                record: {
                    date: [y, m, d].join('-'),
                    precipitation: _get(data, ['precipitation', y, m, d], ''),
                    temperature_min: _get(data, ['temperatureMin', y, m, d], ''),
                    temperature_max: _get(data, ['temperatureMax', y, m, d], ''),
                },
            };
            window
                .fetch(`//${process.env.apiHost}/locations/${id}/record.json`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                .then((response) => {
                    setTimeout(() => {
                        if (response.ok) {
                            updateModified(y, m, d, 'sent');
                        } else {
                            updateModified(y, m, d, 'error');
                        }
                    }, 1000);
                })
                .catch(() => {
                    setTimeout(() => {
                        updateModified(y, m, d, 'error');
                    }, 1000);
                });
        }
    }, [modified]);

    const props = {
        today,
        year,
        data,
        mode,
        modified,
        onBlur,
        monthlyTotals,
        yearlyTotals,
        toFixed,
        userIsOwner,
    };

    return (
        <>
            {alert && userIsOwner && (
                <Box mb={3} className="no-print">
                    <Alert severity="info" onClose={() => setAlert(false)}>
                        Select a table-cell below to edit. Use [tab] and [shift]+[tab] to move
                        forward and back.
                    </Alert>
                </Box>
            )}
            <Hidden mdUp>
                <TablePortrait {...props} />
            </Hidden>
            <Hidden smDown>
                <TableLandscape {...props} />
            </Hidden>
        </>
    );
};
