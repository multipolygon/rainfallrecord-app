/* eslint-disable react/no-array-index-key */

import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { UserContext } from './User';
import FormDialog from './FormDialog';

export default () => {
    const [user, setUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const icons = [
        <SentimentVeryDissatisfiedIcon />,
        <SentimentSatisfiedAltIcon />,
        <SentimentVerySatisfiedIcon />,
    ];

    const fields = {
        feedback_text: {
            label: 'Message',
            placeholder: '(optional)',
            helperText: 'Any requests or feedback?',
            autoFocus: true,
            inputLabelProps: { shrink: true },
            multiline: true,
        },
    };

    const onClick = (n) => {
        setUser({ ...user, feedback_rating: n });
        setOpen(true);
        window
            .fetch(`//${process.env.apiHost}/user.json`, {
                method: 'PATCH',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    utf8: '✓',
                    user: {
                        feedback_rating: n,
                    },
                }),
            })
            .catch(() => {});
    };

    return (
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                title="Thank you!"
                fields={fields}
                namespace="user"
                method="PATCH"
                url="user.json"
                source={user}
                setSource={setUser}
                saveButtonText="Send"
            />
            <ButtonGroup size="small">
                {icons.map((i, n) => (
                    <Button
                        key={n}
                        variant={user.feedback_rating === n ? 'contained' : 'outlined'}
                        onClick={() => onClick(n)}
                    >
                        {i}
                    </Button>
                ))}
            </ButtonGroup>
        </>
    );
};
