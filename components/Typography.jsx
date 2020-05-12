import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// see /css/theme.js

const debug = false;
const c = (s) => (debug ? s : undefined);

export const H2 = ({ children }) => (
    <Box mt={2} mb={1} style={{ backgroundColor: c('#F00') }}>
        <Typography variant="h2">{children}</Typography>
    </Box>
);

export const H3 = ({ children }) => (
    <Box mt={3} mb={2} style={{ backgroundColor: c('#F00') }}>
        <Typography variant="h3">{children}</Typography>
    </Box>
);

export const P = ({ children }) => (
    <Box my={1} style={{ backgroundColor: c('#00F') }}>
        <Typography variant="body1">{children}</Typography>
    </Box>
);

export const Small = ({ children }) => (
    <Box style={{ backgroundColor: c('#00F') }}>
        <Typography variant="body2">{children}</Typography>
    </Box>
);

export const ContentBox = ({ children }) => (
    <Box style={{ backgroundColor: c('#0F0') }}>{children}</Box>
);

export const ContentInner = ({ children }) => <Box my={1}>{children}</Box>;
