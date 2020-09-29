import Paper from '@material-ui/core/Paper';
import { useRef, useEffect, useCallback } from 'react';

export default function LocationsGeoJsonMap({ locations }) {
    const lMap = useRef();
    const geoBaseLayer = useRef();

    const drawMap = useCallback((container) => {
        if (container !== null && typeof window === 'object' && typeof window.L === 'object') {
            const osmBaseLayer = window.L.tileLayer(`${process.env.OSM_HOST}/{z}/{x}/{y}.png`, {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            });

            const thuderforestBaseLayer = window.L.tileLayer(
                `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${process.env.TF_API_KEY}`,
                {
                    attribution:
                        '<a href="https://www.thunderforest.com/maps/landscape/">thunderforest.com</a>',
                },
            );

            const baseLayers = {
                Streetmap: osmBaseLayer,
                Landscape: thuderforestBaseLayer,
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

            lMap.current = window.L.map(container, {
                center: [0, 0],
                zoom: 1,
                scrollWheelZoom: false,
                fullscreenControl: {
                    pseudoFullscreen: true,
                },
                layers: [osmBaseLayer, ...Object.values(featureLayers)],
            });

            window.L.control
                .layers(baseLayers, featureLayers, { autoZIndex: false, hideSingleBase: true })
                .addTo(lMap.current);
        }
    }, []);

    useEffect(() => {
        if (
            locations.type &&
            locations.type === 'FeatureCollection' &&
            locations.features.length > 0
        ) {
            if (typeof window === 'object' && typeof window.L === 'object') {
                const divIcon = window.L.divIcon({
                    html: '&#9679;',
                    className: 'mapicon',
                    iconSize: [20, 20],
                });

                const geoLayer = window.L.geoJSON(locations, {
                    pointToLayer: (feature, latlng) => {
                        return window.L.marker(latlng, {
                            icon: divIcon,
                        });
                    },
                    style: {
                        fillOpacity: 0.6,
                    },
                    onEachFeature: ({ properties }, featureLayer) => {
                        featureLayer.bindPopup(
                            () =>
                                `<a href="/location?id=${properties.id}">${properties.title}, ${properties.location}</a>`,
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
                });

                geoLayer.addTo(geoBaseLayer.current);

                lMap.current.fitBounds(geoLayer.getBounds(), {
                    animate: true,
                    padding: [10, 10],
                });
            }
        }
    }, [locations]);

    return <Paper ref={drawMap} elevation={1} style={{ height: '40vh', minHeight: '240px' }} />;
}
