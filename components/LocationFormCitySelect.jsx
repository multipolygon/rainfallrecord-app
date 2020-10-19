import { useState, useEffect } from 'react';
import _snakeCase from 'lodash/snakeCase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function LocationFormCountryCitySelect({ data, updateData, errors }) {
    const [cities, setCities] = useState(null);

    useEffect(() => {
        setCities(null);
        if (window && data.country) {
            window
                .fetch(`/countries/${_snakeCase(data.country)}.json`)
                .then((response) => {
                    if (response.ok) {
                        response
                            .json()
                            .then((obj) => setCities(obj))
                            .catch(() => {});
                    }
                })
                .catch(() => {});
        }
    }, [data.country]);

    return (
        <>
            {cities && (
                <Autocomplete
                    id="combo-box-demo"
                    options={Object.keys(cities).sort()}
                    getOptionLabel={(i) => i}
                    autoSelect
                    value={data.town_suburb}
                    onChange={(e, value) => {
                        const city = cities[value];
                        if (city) {
                            updateData({
                                town_suburb: value,
                                longitude: city[0],
                                latitude: city[1],
                            });
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nearest City"
                            variant="outlined"
                            size="small"
                            error={errors.town_suburb !== undefined}
                            required
                            style={{ width: '100%' }}
                            fullWidth
                        />
                    )}
                />
            )}
        </>
    );
}
