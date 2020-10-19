/* global process */
/* eslint-disable no-alert */
import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect, useContext, useReducer } from 'react';
import Dialog from '@material-ui/core/Dialog';
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
import Typography from '@material-ui/core/Typography';
import { FeedbackContext } from './Feedback';

export default function FormDialog({
    open,
    setOpen,
    title,
    description,
    fields,
    namespace,
    method,
    url,
    source,
    setSource,
    onSave,
    saveButtonText = 'Save',
}) {
    const [data, updateData] = useReducer((obj1, obj2) => ({ ...obj1, ...obj2 }), {});
    const [active, setActive] = useState(false);
    const [, setFeedback] = useContext(FeedbackContext);
    const [errors, setErrors] = useState({});

    const getFieldValues = (obj) =>
        Object.keys(fields).reduce(
            (acc, f) => ({ ...acc, [f]: (obj || {})[f] || fields[f].default || '' }),
            {},
        );

    useEffect(() => {
        if (open) {
            updateData(getFieldValues(source));
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
            .fetch(`${process.env.API_HOST}/${url}`, {
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

    const fieldComponent = (k) => {
        if (fields[k].type === 'other') {
            const Component = fields[k].component;
            return <Component data={data} updateData={updateData} errors={errors} />;
        }

        if (fields[k].type === 'checkbox') {
            return (
                <FormControl required={fields[k].required} error={errors[k] !== undefined}>
                    <FormControlLabel
                        label={fields[k].label || humanize(k)}
                        control={
                            <Checkbox
                                checked={data[k] === '1'}
                                onChange={(e) =>
                                    updateData({
                                        [k]: e.target.checked ? '1' : '0',
                                    })
                                }
                                color="primary"
                            />
                        }
                    />
                    <FormHelperText>
                        {errors[k] !== undefined ? errors[k][0] : fields[k].helperText}
                    </FormHelperText>
                </FormControl>
            );
        }

        return (
            <TextField
                label={fields[k].label || humanize(k)}
                type={fields[k].type || 'text'}
                inputProps={fields[k].inputProps || {}}
                name={k}
                value={data[k]}
                onChange={(e) => updateData({ [k]: e.target.value })}
                error={errors[k] !== undefined}
                helperText={errors[k] !== undefined ? errors[k][0] : fields[k].helperText}
                placeholder={fields[k].placeholder}
                autoFocus={fields[k].autoFocus}
                multiline={fields[k].multiline}
                InputLabelProps={fields[k].InputLabelProps}
                required={fields[k].required}
                variant="outlined"
                size="small"
                style={{ width: '100%' }}
                fullWidth
            />
        );
    };

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
                    {errors && Object.keys(errors).length > 0 && (
                        <Box mb={3}>
                            <Typography variant="body2" color="secondary">
                                Please review and correct these fields:{' '}
                                {Object.keys(errors).join(', ')}.
                            </Typography>
                        </Box>
                    )}
                    {description && (
                        <Box mb={3}>
                            <Typography variant="body2">{description}</Typography>
                        </Box>
                    )}
                    {Object.keys(fields).map((k) => (
                        <Box key={k} mb={3}>
                            {fieldComponent(k)}
                        </Box>
                    ))}
                    <Box mb={3} style={{ textAlign: 'right' }}>
                        <Button onClick={cancel}>Cancel</Button>{' '}
                        <Button onClick={save}>{saveButtonText}</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Backdrop open={active} style={{ zIndex: 1 }}>
                <WhiteCircularProgress />
            </Backdrop>
        </>
    );
}
