import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Head from 'next/head';

import Paper from '@material-ui/core/Paper';
import { H1 } from "./Typography";

export default ({ title, windowTitle, children }) => {
    return (
        <>
            <Head>
                <title>
                    {[windowTitle || title, 'RainfallRecord'].filter(Boolean).join(' - ')}
                </title>
                <meta property="og:title" content={windowTitle || title} />
            </Head>
            <Container maxWidth="lg">
                <Box mt={4} pt={2} pb={3} px={2} component={Paper} className="fogBackground" style={{minHeight: '90vh'}}>
                    <H1>rainfallrecord.info</H1>
                    {children}
                </Box>
                <Container maxWidth="md">
                    <Box mt={2} mb={3} style={{textAlign: 'center'}}>
                        <footer>
                            <small>
                                This service and all software are provided on an &quot;as is&quot; basis without warranties of any kind, either express or implied,
                                including, without limitation, fitness for a particular purpose.
                                Your use of the services is at your sole risk.
                                I do not guarantee the accuracy or timeliness of information available from the service.
                                <br/>
                                Background photo by
                                <a href="http://www.flickr.com/photos/marj_k/3352492089/">Marj Kibby</a>
                                under Creative Commons Share-Remix-Attribution-Noncommercial as at Mar 2009
                                <br/>
                                &copy;
                                Website copyright Reilly Beacom 2020
                            </small>
                        </footer>
                    </Box>
                </Container>
            </Container>
        </>
    );
};
