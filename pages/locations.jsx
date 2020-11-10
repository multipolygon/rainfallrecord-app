import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import GeoJsonMap from '../components/locations/GeoJsonMap';
import { ContentBox, H2, P } from '../components/Typography';
import Layout from '../components/Layout';
import LocationsTable from '../components/LocationsTable';

export default () => {
    const src = `${process.env.CACHE_HOST}/locations.json`;

    const [locations, setLocations] = useState({
        type: 'FeatureCollection',
        features: [],
    });

    useEffect(() => {
        if (typeof window === 'object' && typeof window.L === 'object') {
            window
                .fetch(src, {
                    cache: 'default',
                    credentials: 'omit',
                    mode: 'cors',
                })
                .then((response) => {
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
                <P>
                    <small style={{ color: 'grey' }}>
                        Please note, the map and data table are updated once per day only.
                    </small>
                </P>
                <GeoJsonMap locations={locations} />
                <Box mt={3}>
                    <LocationsTable
                        locations={locations.features.map(({ properties }) => properties)}
                    />
                </Box>
            </ContentBox>
        </Layout>
    );
};
