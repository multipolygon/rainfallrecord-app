import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Layout from '../components/Layout';
import { ContentBox, H2, P } from '../components/Typography';
import { UserContext } from '../components/User';
import NewUser from '../components/user/New';
import ShowUser from '../components/user/Show';

export default () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <Layout>
            <ContentBox>
                {user === null && <H2>Loading...</H2>}
                {user === false && (
                    <>
                        <H2>Temporarily Unavailable</H2>
                        <P>There was an error when connecting to the server.</P>
                        <P>
                            This may happen occasionally as the server is hosted on free resources.
                        </P>
                        <P>Please try again soon!</P>
                        <Button variant="outlined" size="small" onClick={() => setUser(null)}>
                            Refresh
                        </Button>
                    </>
                )}
                {user && user.id === undefined && <NewUser />}
                {user && user.id !== undefined && <ShowUser {...{ user, setUser }} />}
            </ContentBox>
        </Layout>
    );
};
