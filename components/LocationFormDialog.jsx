import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from './FormDialog';
import MapInput from './LocationFormMapInput';
import CountrySelect from './LocationFormCountrySelect';
import CitySelect from './LocationFormCitySelect';

export default function LocationFormDialog({ id, title, buttonText, source, setSource, onSave }) {
    const [open, setOpen] = useState(false);

    const fields = {
        ...(id
            ? {}
            : {
                  i_agree_to_creative_commons: {
                      type: 'checkbox',
                      required: true,
                      label:
                          'I agree to provide data under the Creative Commons Attribution-Share Alike 2.5 Australia License',
                  },
              }),
        title: {
            required: true,
        },
        country: {
            type: 'other',
            component: CountrySelect,
        },
        town_suburb: {
            type: 'other',
            component: CitySelect,
        },
        latitude: {
            type: 'number',
            inputProps: { min: -90, max: 90, step: 0.001 },
        },
        longitude: {
            type: 'number',
            inputProps: { min: -180, max: 180, step: 0.001 },
        },
        map: {
            type: 'other',
            component: MapInput,
        },
    };

    return (
        <>
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                {buttonText || (id && 'Edit Details') || 'New Location'}
            </Button>
            <FormDialog
                open={open}
                setOpen={setOpen}
                title={title || (id && 'Location Details') || 'New Location'}
                description="Please note, title and all other fields will be visible to the public."
                fields={fields}
                namespace="location"
                method={id ? 'PUT' : 'POST'}
                url={id ? `locations/${id}.json` : 'locations.json'}
                source={source}
                setSource={setSource}
                onSave={onSave}
            />
        </>
    );
}
