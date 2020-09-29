import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from '../FormDialog';

export default function ForgotUserDialog() {
    const [open, setOpen] = useState(false);

    const fields = {
        email: {
            type: 'email',
            helperText: 'an email will be sent to the address on your account',
        },
    };

    return (
        <>
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                Reset by Email
            </Button>
            <FormDialog
                open={open}
                setOpen={setOpen}
                title="Reset by Email"
                fields={fields}
                method="POST"
                url="password_resets.json"
            />
        </>
    );
}
