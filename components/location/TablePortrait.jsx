import Moment from 'moment';
import { useRef, useEffect } from 'react';
import TableCell from './TableCell';

export default ({ selectedDate, monthlyTotals, modified, getMeasurement, onClick }) => {
    const table = useRef(null);

    useEffect(() => {
        const div = table.current;
        if (div) {
            const left = (div.scrollWidth / 13) * (selectedDate.month + 1);
            if (left < div.scrollLeft || left > div.scrollLeft + div.offsetWidth) {
                table.current.scrollLeft = left;
            }
        }
    }, [selectedDate.month, table.current]);

    return (
        <div style={{ overflowX: 'auto' }} ref={table}>
            <table className="calendar-table calendar-table-portrait">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        {[...Array(12).keys()].map((m) => (
                            <th key={m}>{Moment({ month: m }).format('MMM')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(31).keys()].map((d) => (
                        <tr key={d}>
                            <th>{d + 1}</th>
                            {[...Array(12).keys()].map((m) => (
                                <TableCell
                                    {...{
                                        key: `${d}-${m}`,
                                        selectedDate,
                                        modified,
                                        getMeasurement,
                                        m,
                                        d: d + 1,
                                        onClick,
                                    }}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>&nbsp;</th>
                        {[...Array(12).keys()].map((m) => (
                            <td key={m} className="total">{monthlyTotals[m]}</td>
                        ))}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
