import Layout from '../components/Layout';
import LocationsTable from '../components/LocationsTable';
import { ContentBox, H2 } from '../components/Typography';
import { UserContext } from '../components/User';

export default function Index() {
    return (
        <Layout>
            <UserContext.Consumer>
                {([user]) => (
                    <ContentBox>
                        {user !== null && (
                            <>
                                <H2>User: {user.username}</H2>
                                <LocationsTable locations={user.locations} />
                            </>
                        )}
                    </ContentBox>
                )}
            </UserContext.Consumer>
        </Layout>
    );
}
