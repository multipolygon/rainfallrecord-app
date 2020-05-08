import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GeoJsonMap from '../components/GeoJsonMap';
import { ContentBox, H2 } from '../components/Typography';
import Link from '../components/Link';
import Layout from '../components/Layout';

export default () => {
    // TODO Static:
    const src = "http://api.rainfallrecord.localhost/locations.json";
    
    const [locations, setLocations] = useState({
        type: 'FeatureCollection',
        features: [],
    });
    
    useEffect(() => {
        if (typeof window === 'object' && typeof window.L === 'object') {
            window.fetch(src).then((response) => {
                if (response.ok) {
                    response.json().then((obj) => {
                        setLocations(obj);
                    });
                }
            });
        }
    }, []);
    
    return (
        <Layout title="Locations">
            <ContentBox>
                <H2>Locations</H2>
                <GeoJsonMap
                    center={[-28.076922, 134.003202]}
                    locations={locations}
                />
                <Box mt={3}>
                    <TableContainer component={Paper} size="small" style={{backgroundColor: 'transparent'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell align="right">Last 7 Days (mm)</TableCell>
                                    <TableCell align="right">Last 30 Days (mm)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {locations.features.map(({properties}) => (
                                    <TableRow key={properties.id}>
                                        <TableCell component="th" scope="row">
                                            <Link href="/locations/[id]" as={`/locations/${properties.id}/`}>
                                                {properties.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{properties.location}</TableCell>
                                        <TableCell align="right">{properties.total_7_days}</TableCell>
                                        <TableCell align="right">{properties.total_30_days}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </ContentBox>
        </Layout>
    );
}
