import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import humanize from 'underscore.string/humanize';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { FeedbackContext } from './Feedback';

export default ({
    open,
    setOpen,
    title,
    fields,
    namespace,
    method,
    url,
    source,
    setSource,
    onSave,
}) => {
    const [data, setData] = useState({});
    const [active, setActive] = useState(false);
    const [, setFeedback] = useContext(FeedbackContext);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            setData(
                Object.keys(fields).reduce(
                    (acc, f) => ({ ...acc, [f]: (source || {})[f] || fields[f].default || '' }),
                    {},
                ),
            );
            setErrors({});
            setActive(false);
        }
    }, [open]);

    const cancel = () => {
        setOpen(false);
        setActive(false);
    };

    const save = () => {
        setActive(true);
        setErrors({});
        window
            .fetch(`//${process.env.apiHost}/${url}`, {
                method: method || 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    utf8: '✓',
                    ...(namespace
                        ? {
                              [namespace]: { ...data },
                          }
                        : data),
                }),
            })
            .then((response) => {
                response
                    .json()
                    .then((body) => {
                        setActive(false);
                        if (response.ok) {
                            setOpen(false);
                            setFeedback({ ok: true, msg: 'Success.' });
                            if (setSource) {
                                setSource({
                                    ...source,
                                    ...data,
                                });
                            }
                            if (onSave) {
                                onSave({ data, body });
                            }
                        } else {
                            setFeedback({ ok: false, msg: 'Not saved!' });
                            setErrors(body.errors || {});
                        }
                    })
                    .catch(() => {
                        setActive(false);
                        setFeedback({ ok: false, msg: 'Response error!' });
                    });
            })
            .catch(() => {
                setActive(false);
                setFeedback({ ok: false, msg: 'Request failed!' });
            });
    };

    const WhiteCircularProgress = withStyles({
        root: {
            color: '#FFF',
        },
    })(CircularProgress);

    return (
        <>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open && !active}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {Object.keys(fields).map((k, i) => (
                        <Box key={k} mt={i === 0 ? 0 : 3}>
                            {fields[k].type !== 'checkbox' && (
                                <TextField
                                    label={fields[k].label || humanize(k)}
                                    type={fields[k].type || 'text'}
                                    inputProps={{}}
                                    value={data[k]}
                                    onChange={(e) => setData({ ...data, [k]: e.target.value })}
                                    error={errors[k] !== undefined}
                                    helperText={
                                        errors[k] !== undefined
                                            ? errors[k][0]
                                            : fields[k].helperText
                                    }
                                    required={fields[k].required}
                                    variant="outlined"
                                    size="small"
                                    style={{ width: '100%' }}
                                />
                            )}
                            {fields[k].type === 'checkbox' && (
                                <FormControl
                                    required={fields[k].required}
                                    error={errors[k] !== undefined}
                                >
                                    <FormControlLabel
                                        label={fields[k].label || humanize(k)}
                                        control={
                                            <Checkbox
                                                checked={data[k] === '1'}
                                                onChange={(e) =>
                                                    setData({
                                                        ...data,
                                                        [k]: e.target.checked ? '1' : '0',
                                                    })
                                                }
                                                color="primary"
                                            />
                                        }
                                    />
                                    <FormHelperText>
                                        {errors[k] !== undefined
                                            ? errors[k][0]
                                            : fields[k].helperText}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={active} style={{ zIndex: 1 }}>
                <WhiteCircularProgress />
            </Backdrop>
        </>
    );
};
