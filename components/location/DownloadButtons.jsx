import Button from '@material-ui/core/Button';

const DownloadButton = ({ src, ext }) => (
    <Button
        component="a"
        size="small"
        variant="outlined"
        target="_blank"
        title={`Download ${ext.toUpperCase()} File`}
        href={src.replace('.json', `.${ext}`)}
        download
    >
        {ext}
    </Button>
);

export default ({ src }) => (
    <>
        Data download: <DownloadButton src={src} ext="csv" />{' '}
        <DownloadButton src={src} ext="json" /> <DownloadButton src={src} ext="xml" />
    </>
);
