import Layout from '../components/Layout';
import { ContentBox, H1, P } from '../components/Typography';

export default () => (
    <Layout title="About" href="/about/">
        <H1>About</H1>
        <ContentBox>
            <P>
                to-do
            </P>
        </ContentBox>
    </Layout>
);
