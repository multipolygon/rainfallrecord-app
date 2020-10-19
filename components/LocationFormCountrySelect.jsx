import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import countries from '../public/countries.json';

export default function LocationFormCountryCitySelect({ data, updateData, errors }) {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={Object.keys(countries)}
            getOptionLabel={(i) => i}
            autoSelect
            value={data.country}
            onChange={(e, value) => {
                const country = countries[value];
                if (country) {
                    updateData({
                        country: value,
                        longitude: country[0],
                        latitude: country[1],
                    });
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    size="small"
                    error={errors.country !== undefined}
                    required
                    style={{ width: '100%' }}
                    fullWidth
                />
            )}
        />
    );
}
