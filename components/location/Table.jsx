import Hidden from '@material-ui/core/Hidden';
import { useState, useEffect, useReducer } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Moment from 'moment';
import TableLandscape from './TableLandscape';
import TablePortrait from './TablePortrait';

const patchReducer = (state, patch) => ({ ...state, ...patch });

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
        if (y && m && d) {
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
                .fetch(`${process.env.API_HOST}/locations/${id}/record.json`, {
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

    const focusNext = (e, step) => {
        const ti = parseInt(e.target.getAttribute('tabindex'), 10);
        if (ti && ti + step !== 0) {
            const e2 = document.getElementById(`td${ti + step}`);
            if (e2) {
                e2.focus();
            }
        }
    };

    const focusNextMonth = (e, step) => {
        const m = parseInt(e.target.getAttribute('data-m'), 10);
        const d = parseInt(e.target.getAttribute('data-d'), 10);
        if (m && d) {
            const date = Moment([year, m + step - 1, d]);
            if (date.isValid()) {
                const e2 = document.getElementById(`td${date.dayOfYear()}`);
                if (e2) {
                    e2.focus();
                }
            }
        }
    };

    const onKeyDown = (e) => {
        if (e.defaultPrevented || e.isComposing) {
            return;
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
        switch (e.key) {
            case 'Down':
            case 'ArrowDown':
                focusNextMonth(e, 1);
                break;
            case 'Up':
            case 'ArrowUp':
                focusNextMonth(e, -1);
                break;
            case 'Left':
            case 'ArrowLeft':
                focusNext(e, -1);
                break;
            case 'Right':
            case 'ArrowRight':
                focusNext(e, 1);
                break;
            case 'Tab':
            case 'Enter':
                focusNext(e, e.shiftKey ? -1 : 1);
                break;
            case 'Esc':
            case 'Escape':
                e.target.blur();
                break;
            case '-':
                if (!e.target.innerText.includes('-')) return;
                break;
            case '.':
                if (!e.target.innerText.includes('.')) return;
                break;
            case 'Backspace':
                return;
            default:
                if (e.key >= 0 && e.key <= 9) return;
        }

        e.preventDefault();
    };

    const onKeyPress = (e) => {
        const k = e.charCode || e.keyCode || e.which;
        if (k === 32) e.preventDefault(); // space
    };

    // https://stackoverflow.com/a/3805897/5165
    const onFocus = () => {
        if (document && document.execCommand) {
            setTimeout(() => document.execCommand('selectAll', false, null), 1);
        }
    };

    const props = {
        year,
        data,
        mode,
        modified,
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
                        Select a table-cell below to edit in place (just like a spreadsheet). Use
                        [tab] to move to the next date (and [shift]+[tab] to go back). Averages are
                        calculated from years with data recorded (even just a single zero entry),
                        excluding the current year.
                    </Alert>
                </Box>
            )}
            <div {...{ onKeyDown, onKeyPress, onFocus, onBlur }}>
                <Hidden mdUp>
                    <TablePortrait {...props} />
                </Hidden>
                <Hidden smDown>
                    <TableLandscape {...props} />
                </Hidden>
            </div>
        </>
    );
};
