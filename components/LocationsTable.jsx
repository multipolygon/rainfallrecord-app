import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from './Link';

export default ({ locations }) => (
    <TableContainer component={Paper} size="small" style={{ backgroundColor: 'transparent' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell align="right">7 Days</TableCell>
                    <TableCell align="right">30 Days</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {locations.map((properties) => (
                    <TableRow key={properties.id}>
                        <TableCell component="th" scope="row">
                            <Link href="/location" as={`/location/?id=${properties.id}`}>
                                {properties.title}
                            </Link>
                        </TableCell>
                        <TableCell>{properties.location}</TableCell>
                        <TableCell align="right">{properties.total_7_days}</TableCell>
                        <TableCell align="right">{properties.total_30_days}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);
