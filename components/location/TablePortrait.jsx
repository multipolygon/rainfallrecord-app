import Moment from 'moment';
import { useRef, useEffect } from 'react';
import _range from 'lodash/range';
import _get from 'lodash/get';
import Box from '@material-ui/core/Box';
import TableCell from './TableCell';

const today = Moment();

export default function LocationTablePortrait({
    year,
    data,
    mode,
    modified,
    monthlyTotals,
    yearlyTotals,
    toFixed,
    userIsOwner,
}) {
    const table = useRef(null);

    // Scroll table to show today:
    useEffect(() => {
        const div = table.current;
        if (div) {
            const left = (div.scrollWidth / 13) * (today.month() + 1);
            if (left < div.scrollLeft || left > div.scrollLeft + div.offsetWidth) {
                table.current.scrollLeft = left;
            }
        }
    }, [table.current]);

    return (
        <>
            <div style={{ overflowX: 'auto' }} ref={table}>
                <table className="calendar-table calendar-table-portrait">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            {_range(12).map((m) => (
                                <th key={m}>{Moment({ month: m }).format('MMM')}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {_range(31).map((d) => (
                            <tr key={d}>
                                <th width="30px">{d + 1}</th>
                                {_range(12).map((m) => (
                                    <TableCell
                                        {...{
                                            key: `${m}-${d}`,
                                            data,
                                            mode,
                                            modified,
                                            year,
                                            m: m + 1,
                                            d: d + 1,
                                            userIsOwner,
                                        }}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>&nbsp;</th>
                            {_range(12).map((m) => (
                                <td key={m} className="total">
                                    {toFixed(_get(monthlyTotals, [year, m + 1]))}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Box mt={2} style={{ textAlign: 'center' }}>
                {year} total: {toFixed(_get(yearlyTotals, [year]))}
            </Box>
        </>
    );
}
