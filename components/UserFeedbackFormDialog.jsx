/* global process */
/* eslint-disable react/no-array-index-key */

import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import NeutralIcon from '@material-ui/icons/SentimentSatisfied';
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { UserContext } from './User';
import FormDialog from './FormDialog';

export default function UserFeedbackFormDialog() {
    const [user, setUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const icons = [<DissatisfiedIcon />, <NeutralIcon />, <SatisfiedIcon />];

    const altText = {
        0: 'Dissatisfied',
        1: 'Neutral',
        2: 'Satisfied',
    };

    const fields = {
        feedback_text: {
            label: 'Message',
            placeholder: '(optional)',
            helperText: 'Any further comments or requests?',
            autoFocus: true,
            inputLabelProps: { shrink: true },
            multiline: true,
        },
    };

    const onClick = (n) => {
        setUser({ ...user, feedback_rating: n });
        setOpen(true);
        window
            .fetch(`${process.env.API_HOST}/user.json`, {
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
                        title={altText[n]}
                    >
                        {i}
                    </Button>
                ))}
            </ButtonGroup>
        </>
    );
}
