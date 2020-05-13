import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/Layout';
import { ContentBox, H2, P } from '../components/Typography';

export default function Index() {
    return (
        <Layout>
            <ContentBox>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <H2>Free and No Ads!</H2>
                        <P>
                            You can create a record sheet on this website for your own rain gauge
                            measurements.
                        </P>
                        <H2>Easy to Use</H2>
                        <P>
                            There is no software to download or install. Simply register and start
                            entering data on this website.
                        </P>
                        <P>Graphs are automatically displayed for your data.</P>
                        <P>You will get a direct, sharable, public URL linking to your records.</P>
                        <H2>Crowd-Sourcing and Web 2.0</H2>
                        <P>
                            This service aims to assist individuals in the recording, analysis and
                            sharing of personal rainfall data.
                        </P>
                        <P>
                            At the same time there is the hope of collecting valuable rainfall
                            information from across Australia by means of collaborative and
                            distributed public effort – termed{' '}
                            <a href="http://en.wikipedia.org/wiki/Crowd_sourcing">crowd-sourcing</a>
                        </P>
                        <H2>Creative Commons license</H2>
                        <P>
                            All data collected by this service is provided under the
                            <a href="http://creativecommons.org/licenses/by-sa/2.5/au/">
                                Creative Commons Attribution-Share Alike 2.5 Australia License
                            </a>
                            .
                        </P>
                        <P>All record sheet data is publicly visible.</P>
                        <H2>Data Export</H2>
                        <P>
                            Its always possible to download your raw data for any year of any record
                            sheet. The data is provided in CSV format which can be viewed and edited
                            in most spread sheet software.
                        </P>
                        <P>
                            You should regularly back-up you data by choosing to download the CSV
                            from your record-sheet page.
                        </P>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <H2>Example:</H2>
                        <Paper
                            component="img"
                            src="/assets/example.png"
                            style={{ maxWidth: '100%' }}
                            alt="screen shot"
                        />
                    </Grid>
                </Grid>
            </ContentBox>
        </Layout>
    );
}
