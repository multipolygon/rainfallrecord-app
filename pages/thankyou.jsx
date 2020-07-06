import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import Layout from '../components/Layout';
import { H2 } from '../components/Typography';

export default () => (
    <Layout>
        <div style={{ marginTop: '15vh', textAlign: 'center' }}>
            <H2>
                <SentimentSatisfiedAltIcon />
            </H2>
            <H2>Thank you!</H2>
        </div>
    </Layout>
);
