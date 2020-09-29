import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from './FormDialog';

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
        town_suburb: { required: true, label: 'Town', helperText: 'or suburb, city, etc.' },
        region: { required: true, helperText: 'or state, territory, etc.' },
        country: { required: true },
        latitude: {
            type: 'number',
            inputProps: { min: -90, max: 90, step: 0.001 },
            helperText: 'as decimal degrees (optional)',
        },
        longitude: {
            type: 'number',
            inputProps: { min: -180, max: 180, step: 0.001 },
            helperText: 'as decimal degrees (optional)',
            markerMap: true,
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
