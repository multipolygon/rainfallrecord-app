import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Nav from './Nav';

export default ({ title, windowTitle, children }) => (
    <>
        <Head>
            <title>{[windowTitle || title, 'RainfallRecord'].filter(Boolean).join(' - ')}</title>
            <meta property="og:title" content={windowTitle || title} />
        </Head>
        <Container maxWidth="md">
            <Box
                mt={2}
                pt={2}
                pb={3}
                px={2}
                component={Paper}
                className="fogBackground"
                style={{ minHeight: '90vh' }}
            >
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item>
                        <Typography variant="h1" style={{ color: '#c2c4d9', fontWeight: 'bold' }}>
                            ClimateLog
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Nav />
                    </Grid>
                </Grid>
                {children}
            </Box>
            <Container maxWidth="md">
                <Box mt={2} mb={3} style={{ textAlign: 'center' }}>
                    <footer>
                        <small>
                            This service and all software are provided on an &quot;as is&quot; basis
                            without warranties of any kind, either express or implied, including,
                            without limitation, fitness for a particular purpose. Your use of the
                            services is at your sole risk. I do not guarantee the accuracy or
                            timeliness of information available from the service.
                            <br />
                            Background photo by{' '}
                            <a href="http://www.flickr.com/photos/marj_k/3352492089/">
                                Marj Kibby
                            </a>{' '}
                            under Creative Commons Share-Remix-Attribution-Noncommercial as at Mar
                            2009
                            <br />
                            &copy; Website copyright Reilly Beacom 2020
                        </small>
                    </footer>
                </Box>
            </Container>
        </Container>
    </>
);
