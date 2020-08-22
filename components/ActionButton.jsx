/* eslint-disable no-alert */
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FeedbackContext } from './Feedback';

export default function Index({ body, url, method, onSuccess, confirm, color, children }) {
    const [active, setActive] = useState(false);
    const [, setFeedback] = useContext(FeedbackContext);

    const WhiteCircularProgress = withStyles({
        root: {
            color: '#FFF',
        },
    })(CircularProgress);

    const post = () => {
        setActive(true);
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
                    ...(body || {}),
                }),
            })
            .then((response) => {
                if (response.ok) {
                    setFeedback({ ok: true, msg: 'Done.' });
                    if (onSuccess) {
                        onSuccess();
                    }
                }
                setActive(false);
            })
            .catch(() => {
                setFeedback({ ok: false, msg: 'Failed!' });
                setActive(false);
            });
    };

    const click = () => {
        if (confirm) {
            if (window.confirm(confirm)) {
                post();
            }
        } else {
            post();
        }
    };

    return (
        <>
            <Button variant="outlined" size="small" color={color} onClick={click}>
                {children}
            </Button>
            <Backdrop open={active} style={{ zIndex: 1 }}>
                <WhiteCircularProgress />
            </Backdrop>
        </>
    );
}
