import { useContext } from 'react';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import Layout from '../components/Layout';
import LocationsTable from '../components/LocationsTable';
import { ContentBox, H2, H3, P } from '../components/Typography';
import { UserContext } from '../components/User';
import LocationFormDialog from '../components/LocationFormDialog';
import UserFormDialog from '../components/UserFormDialog';
import LogInFormDialog from '../components/LogInFormDialog';
import ForgotUserDialog from '../components/ForgotUserDialog';
import ActionButton from '../components/ActionButton';
import Link from '../components/Link';

export default () => {
    const router = useRouter();
    const [user, setUser] = useContext(UserContext);

    const onSaveLocation = ({ body }) => {
        setUser(null); // force reload
        router.push(`/location?id=${body.id}`);
    };

    return (
        <Layout>
            <ContentBox>
                <H2>User Options</H2>
                {user === null && <H3>Loading...</H3>}
                {user !== null && user.id === undefined && (
                    <>
                        <H3>New Users:</H3>
                        <ContentBox>
                            <UserFormDialog newUser />
                            {' or '}
                            <Link
                                component={Button}
                                variant="outlined"
                                size="small"
                                href="/location"
                                as="/location/?id=0"
                            >
                                Try a Live Demo
                            </Link>
                        </ContentBox>
                        <P>Its free!</P>
                        <H3>Existing Users:</H3>
                        <ContentBox>
                            <LogInFormDialog />
                        </ContentBox>
                        <H3>Forgot Username or Password?</H3>
                        <ContentBox>
                            <ForgotUserDialog />
                        </ContentBox>
                    </>
                )}
                {user !== null && user.id !== undefined && (
                    <>
                        <ContentBox>
                            <ActionButton url="logout" onSuccess={() => setUser(null)}>
                                Log Out
                            </ActionButton>
                            {' '}
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
                                    <Alert
                                        severity="info"
                                        icon={<ArrowUpwardIcon fontSize="inherit" />}
                                    >
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
                        <br />
                        <br />
                        <br />
                        <small>API key:</small>
                        <br />
                        <TextField value={user.api_key} size="small" />
                    </>
                )}
            </ContentBox>
        </Layout>
    );
};
