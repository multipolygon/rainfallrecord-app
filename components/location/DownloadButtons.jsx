import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function LocationDownloadButtons({ src }) {
    return (
        <ButtonGroup size="small">
            {['csv', 'json'].map((ext) => (
                <Button
                    key={ext}
                    variant="outlined"
                    target="_blank"
                    title={`Download ${ext.toUpperCase()} File`}
                    href={src.replace('.json', `.${ext}`)}
                    download
                >
                    {ext}
                </Button>
            ))}
        </ButtonGroup>
    );
}
