import Alert from '@material-ui/lab/Alert';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import LocationsTable from '../LocationsTable';
import LocationFormDialog from '../LocationFormDialog';
import UserFormDialog from '../UserFormDialog';
import UserFeedbackFormDialog from '../UserFeedbackFormDialog';
import ActionButton from '../ActionButton';
import { ContentBox, H3, P } from '../Typography';

export default ({ user, setUser }) => {
    const router = useRouter();

    const onSaveLocation = ({ body }) => {
        setUser(null); // force reload
        router.push(`/location?id=${body.id}`);
    };

    return (
        <>
            <ContentBox>
                <ActionButton url="logout.json" onSuccess={() => setUser(null)}>
                    Log Out
                </ActionButton>{' '}
                <Button variant="outlined" size="small" onClick={() => setUser(null)}>
                    Refresh
                </Button>
            </ContentBox>
            <H3>Private Details</H3>
            <ContentBox>
                <UserFormDialog newUser={false} />{' '}
            </ContentBox>
            <P>Username: {user.username}</P>
            <P>Email: {user.email || '[none]'}</P>
            {!user.email_verified && (
                <Alert
                    severity="warning"
                    action={
                        <ActionButton url="password_resets.json">
                            {user.email_verified || user.email_sent ? 'Re' : ''}
                            Send Verification Email
                        </ActionButton>
                    }
                >
                    Please verify your email address.
                </Alert>
            )}
            <H3>Location Records</H3>
            <ContentBox>
                <LocationFormDialog onSave={onSaveLocation} />
                {user.locations.length === 0 && (
                    <>
                        <br />
                        <br />
                        <Alert severity="info" icon={<ArrowUpwardIcon fontSize="inherit" />}>
                            Click the button above to start a new record location!
                        </Alert>
                    </>
                )}
            </ContentBox>
            {user.locations.length !== 0 && (
                <>
                    <br />
                    <LocationsTable locations={user.locations} />
                </>
            )}
            <H3>Feedback</H3>
            <UserFeedbackFormDialog />
            <br />
            <br />
            <br />
            <div style={{ overflowX: 'auto' }}>
                <small>
                    <P>API Key:</P>
                    <code>{user.api_key}</code>
                </small>
            </div>
        </>
    );
};
