/* global process */
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { useEffect, useRef, useCallback } from 'react';

const floatRegEx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
const isFloat = (n) => floatRegEx.test(n);

export default function MapInput({ data, updateData }) {
    const mapRef = useRef();
    const mapMarkerRef = useRef();

    const isValidLatLng = (lat, lng) =>
        isFloat(lat) && isFloat(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

    const updateLatLng = (latLng, preventMarkerUpdate) => {
        updateData({
            latitude: latLng.lat.toFixed(3),
            longitude: latLng.lng.toFixed(3),
            preventMarkerUpdate,
        });
    };

    const markerMapContainerRef = useCallback((container) => {
        if (container !== null && typeof window === 'object' && typeof window.L === 'object') {
            const osmBaseLayer = window.L.tileLayer(`${process.env.OSM_HOST}/{z}/{x}/{y}.png`, {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            });

            const center = [-28.076, 134.003];

            const lMap = window.L.map(container, {
                center,
                zoom: 1,
                scrollWheelZoom: true,
                layers: [osmBaseLayer],
            });

            mapRef.current = lMap;

            const divIcon = window.L.divIcon({
                html: '&#9679;',
                className: 'mapicon',
                iconSize: [20, 20],
            });

            const marker = window.L.marker(center, {
                icon: divIcon,
                draggable: true,
                autoPan: true,
                autoPanPadding: [10, 10],
            })
                .addTo(lMap)
                .on('moveend', (e) => {
                    updateLatLng(e.target.getLatLng().wrap(), true);
                });

            mapMarkerRef.current = marker;

            const CustomControl = window.L.Control.extend({
                onAdd: () => {
                    const div = window.L.DomUtil.create('button');
                    div.innerHTML = '&#127968;';
                    div.style.height = '30px';
                    div.style.width = '30px';
                    div.style.backgroundColor = '#FFF';
                    div.style.fontWeight = 'bold';
                    div.onclick = () => {
                        lMap.locate({ setView: false });
                    };
                    return div;
                },
                onRemove: () => {},
            });

            new CustomControl({ position: 'topright' }).addTo(lMap);

            lMap.on('locationfound', (e) => updateLatLng(e.latlng));
        }
    }, []);

    useEffect(() => {
        if (data.preventMarkerUpdate) {
            updateData({ preventMarkerUpdate: false });
        } else {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            if (mapMarkerRef.current && isValidLatLng(lat, lng)) {
                mapMarkerRef.current.setLatLng([lat, lng]);
                if (mapRef.current) {
                    mapRef.current.flyTo([lat, lng], 4);
                }
            }
        }
    }, [mapMarkerRef.current, data.latitude, data.longitude]);

    return (
        <>
            <Box
                mt={2}
                component={Paper}
                elevation={1}
                style={{ height: '160px' }}
                ref={markerMapContainerRef}
            />
            <small style={{ color: 'grey' }}>Drag the red marker to your exact location.</small>
        </>
    );
}
