import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Nav from './Nav';

export default function Layout({ title, windowTitle, children }) {
    return (
        <>
            <Head>
                <title>
                    {[windowTitle || title, process.env.APP_NAME].filter(Boolean).join(' - ')}
                </title>
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
                    <div className="hidden-print">
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <Grid item xs={12} sm="auto">
                                <Box mb={2} style={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h1"
                                        style={{
                                            color: '#c2c4d9',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Rainfall
                                        <span
                                            className="mdi mdi-weather-pouring"
                                            style={{ margin: 'auto 2px auto 2px' }}
                                        />
                                        Record
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <Box mb={2} style={{ textAlign: 'center' }}>
                                    <Nav />
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                    {children}
                </Box>
                <Container maxWidth="md">
                    <Box mt={2} mb={3} style={{ textAlign: 'center' }} className="hidden-print">
                        <footer>
                            <small>
                                This free service and all software are provided on an &quot;as
                                is&quot; basis without warranties of any kind, either express or
                                implied, including, without limitation, fitness for a particular
                                purpose. Your use of the services is at your sole risk. I do not
                                guarantee the accuracy or timeliness of information available from
                                the service.
                                <br />
                                Background photo by{' '}
                                <a href="http://www.flickr.com/photos/marj_k/3352492089/">
                                    Marj Kibby
                                </a>{' '}
                                under Creative Commons Share-Remix-Attribution-Noncommercial as at
                                Mar 2009
                                <br />
                                Made with open-source software, please see:
                                <br />
                                <a href="https://github.com/multipolygon/rainfallrecord-app">
                                    source code
                                </a>
                                {' and '}
                                <a href="/third-party-notices.txt">third-party notices</a>.
                            </small>
                        </footer>
                    </Box>
                </Container>
            </Container>
        </>
    );
}
