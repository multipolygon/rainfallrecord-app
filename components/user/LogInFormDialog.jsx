import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from '../FormDialog';
import { UserContext } from '../User';

export default function UserLogInFormDialog() {
    const [, setUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const fields = {
        username: {
            inputProps: {
                autocomplete: 'username',
                autocorrect: 'off',
                autocapitalize: 'none',
            },
        },
        password: {
            type: 'password',
            inputProps: {
                autocomplete: 'current-password',
                autocorrect: 'off',
                autocapitalize: 'none',
            },
        },
    };

    const onSave = () => {
        setUser(null); // force reload
    };

    return (
        <>
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                Log In
            </Button>
            <FormDialog
                open={open}
                setOpen={setOpen}
                title="Log In"
                fields={fields}
                method="POST"
                url="login.json"
                onSave={onSave}
            />
        </>
    );
}
