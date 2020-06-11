import { useContext } from 'react';
import Layout from '../components/Layout';
import { ContentBox, H2, H3, P } from '../components/Typography';
import { UserContext } from '../components/User';
import NewUser from '../components/user/New';
import ShowUser from '../components/user/Show';

export default () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <Layout>
            <ContentBox>
                <H2>User Options</H2>
                {user === null && <H3>Loading...</H3>}
                {user === false && (
                    <P>There was an error contacting the server. Please try again later.</P>
                )}
                {user && user.id === undefined && <NewUser />}
                {user && user.id !== undefined && <ShowUser {...{ user, setUser }} />}
            </ContentBox>
        </Layout>
    );
};
