import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default ({ src }) => (
    <ButtonGroup size="small">
        {['csv', 'json', 'xml'].map((ext) => (
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
