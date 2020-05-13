import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import Layout from '../components/Layout';
import LocationsTable from '../components/LocationsTable';
import { ContentBox, H2, H3, P } from '../components/Typography';
import { UserContext } from '../components/User';
import FormDialog from '../components/FormDialog';

export default function Index() {
    const router = useRouter();
    const [user, setUser] = useContext(UserContext);
    const [userFormDialog, setUserFormDialog] = useState(false);
    const [locationFormDialog, setLocationFormDialog] = useState(false);

    const userFields = {
        username: {},
        email: {
            helperText:
                'Email is not required and will never be used for spam. May be used for password resets and very, very rare announcements.',
        },
        password: {
            type: 'password',
            label: 'New Password',
            helperText: 'Leave blank to keep current password.',
        },
        password_confirmation: { type: 'password', label: 'Confirm Password' },
    };

    const locationFields = {
        title: {
            required: true,
            helperText: 'Please note, title and all location fields will be public.',
        },
        street_address: {},
        town_suburb: { required: true },
        region: { required: true, helperText: 'Region or state, territory, etc.' },
        country: { required: true },
        latitude: {},
        longitude: {},
        i_agree_to_creative_commons: {
            type: 'checkbox',
            required: true,
            label:
                'I agree that to provide data under the: Creative Commons Attribution-Share Alike 2.5 Australia License.',
        },
    };

    const onSaveUser = () => {
        setUser(null); // force reload
    };

    const onSaveLocation = ({ body }) => {
        router.push(`/location?id=${body.id}`);
    };

    return (
        <Layout>
            <ContentBox>
                <H2>User Options</H2>
                {user === null && <H3>[loading]</H3>}
                {user !== null && (
                    <>
                        <H3>Private Details</H3>
                        <P>
                            <Button variant="outlined" onClick={() => setUserFormDialog(true)}>
                                Edit
                            </Button>
                        </P>
                        <P>Username: {user.username}</P>
                        <P>Email: {user.email}</P>
                        <P>Verified: {user.email === user.verified_email ? 'Yes' : 'No'}</P>
                        <H3>Location Records:</H3>
                        <P>
                            <Button variant="outlined" onClick={() => setLocationFormDialog(true)}>
                                New Location
                            </Button>
                        </P>
                        <LocationsTable locations={user.locations} />
                        <FormDialog
                            open={userFormDialog}
                            setOpen={setUserFormDialog}
                            title="Private User Details"
                            fields={userFields}
                            namespace="user"
                            method="PATCH"
                            url="user.json"
                            source={user}
                            onSave={onSaveUser}
                        />
                        <FormDialog
                            open={locationFormDialog}
                            setOpen={setLocationFormDialog}
                            title="New Location"
                            fields={locationFields}
                            namespace="location"
                            method="POST"
                            url="locations.json"
                            onSave={onSaveLocation}
                        />
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
}
