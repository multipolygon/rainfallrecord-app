import Paper from '@material-ui/core/Paper';
import { useRef, useEffect } from 'react';

export default ({ center, locations }) => {
    const mapRef = useRef(null);
    const geoBaseLayer = useRef(null);

    useEffect(() => {
        if (typeof window === 'object' && typeof window.L === 'object') {
            const bounds = window.L.latLngBounds(
                {
                    lat: -8.6710393,
                    lng: 156.185245,
                },
                {
                    lat: -45.277108,
                    lng: 110.48212,
                },
            );

            const osmBaseLayer = window.L.tileLayer(
                'https://osm-tiles.rainfallrecord.info/{z}/{x}/{y}.png',
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                },
            );

            const thuderforestBaseLayer = window.L.tileLayer(
                'https://thunderforest-tiles.rainfallrecord.info/{z}/{x}/{y}.png',
                {
                    attribution:
                        '<a href="https://www.thunderforest.com/maps/landscape/">thunderforest.com</a>',
                },
            );

            const baseLayers = {
                Landscape: thuderforestBaseLayer,
                Streets: osmBaseLayer,
            };

            const featureLayers = {};

            geoBaseLayer.current = window.L.markerClusterGroup({
                showCoverageOnHover: false,
                removeOutsideVisibleBounds: true,
                animate: false,
                animateAddingMarkers: false,
                chunkedLoading: true,
                zoomToBoundsOnClick: false,
            });

            geoBaseLayer.current.on('clusterclick', (e) => {
                e.layer.zoomToBounds({ padding: [20, 20], animate: true });
            });

            window.L.layerGroup();

            featureLayers.Locations = geoBaseLayer.current;

            const lMap = window.L.map('mapContainer', {
                center,
                zoom: 4,
                scrollWheelZoom: false,
                fullscreenControl: {
                    pseudoFullscreen: true,
                },
                layers: [thuderforestBaseLayer, ...Object.values(featureLayers)],
            });

            lMap.fitBounds(bounds, {
                animate: false,
                padding: [10, 10],
            });

            mapRef.current = lMap;

            window.L.control
                .layers(baseLayers, featureLayers, { autoZIndex: false, hideSingleBase: true })
                .addTo(lMap);
        }
    }, []);

    useEffect(() => {
        if (
            locations.type &&
            locations.type === 'FeatureCollection' &&
            locations.features.length > 0
        ) {
            if (typeof window === 'object' && typeof window.L === 'object') {
                window.L.geoJSON(locations, {
                    pointToLayer: (feature, latlng) => {
                        return window.L.circleMarker(latlng, { radius: 10 });
                    },
                    style: {
                        fillOpacity: 0.6,
                    },
                    onEachFeature: ({ properties }, featureLayer) => {
                        featureLayer.bindPopup(
                            () =>
                                `<a href="/locations/${properties.id}/">${properties.title}, ${properties.location}</a>`,
                            {
                                autoPan: true,
                                autoPanPadding: [40, 10],
                                closeButton: false,
                                closeOnEscapeKey: true,
                                closeOnClick: true,
                                minWidth: 220,
                                maxWidth: 220,
                            },
                        );
                    },
                }).addTo(geoBaseLayer.current);
            }
        }
    }, [locations]);

    return (
        <Paper elevation={1}>
            <div id="mapContainer" style={{ height: '40vh', minHeight: '240px' }} />
        </Paper>
    );
};
