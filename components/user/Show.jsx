/* global process */
import Alert from '@material-ui/lab/Alert';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import LocationsTable from '../LocationsTable';
import LocationFormDialog from '../LocationFormDialog';
import UserFormDialog from './UserFormDialog';
import UserFeedbackFormDialog from '../UserFeedbackFormDialog';
import ActionButton from '../ActionButton';
import { ContentBox, H2, H3, P } from '../Typography';

export default function UserShow({ user, setUser }) {
    const router = useRouter();

    const onSaveLocation = ({ body }) => {
        setUser(null); // force reload
        router.push(`/location?id=${body.id}`);
    };

    return (
        <>
            <H2>Hi {user.username}</H2>
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
            {user.system_message && user.system_message.length > 0 && (
                <Alert
                    severity="info"
                    action={
                        <ActionButton
                            url="user.json"
                            method="PATCH"
                            body={{ user: { system_message: '' } }}
                            onSuccess={() => setUser(null)}
                        >
                            Ok
                        </ActionButton>
                    }
                >
                    {user.system_message}
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
                    <LocationsTable locations={user.locations} showTitle />
                </>
            )}
            <H3>Feedback</H3>
            <UserFeedbackFormDialog />
            {process.env.DONATE_BUTTON && (
                <Box mt={3}>
                    <P>
                        $5 donation: <small>(totally optional, no obligation)</small>
                    </P>
                    <div dangerouslySetInnerHTML={{ __html: process.env.DONATE_BUTTON }} />
                    <P>
                        <small>
                            (Donations will go towards website maintenance and server costs.)
                        </small>
                    </P>
                </Box>
            )}
            <H3>API Key</H3>
            <div style={{ overflowX: 'auto', fontSize: '12px' }}>
                <code>{user.api_key}</code>
            </div>
        </>
    );
}
