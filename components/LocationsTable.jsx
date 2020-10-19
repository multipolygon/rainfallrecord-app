import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NextLink from 'next/link';
import Link from './Link';

export default function LocationsTable({ locations, showTitle }) {
    return (
        <TableContainer component={Paper} size="small" style={{ backgroundColor: 'transparent' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">7 Days</TableCell>
                        <TableCell align="right">30 Days</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((properties) => (
                        <NextLink
                            key={properties.id}
                            href="/location"
                            as={`/location?id=${properties.id}`}
                        >
                            <TableRow style={{ cursor: 'pointer' }}>
                                <TableCell component="th" scope="row">
                                    <Link
                                        href="/location"
                                        as={`/location?id=${properties.id}`}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {showTitle && `${properties.title}, `}
                                        {properties.location}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{properties.total_7_days}</TableCell>
                                <TableCell align="right">{properties.total_30_days}</TableCell>
                            </TableRow>
                        </NextLink>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
