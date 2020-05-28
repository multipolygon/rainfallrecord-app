import Moment from 'moment';
import TableCell from './TableCell';

export default ({ selectedDate, monthlyTotals, yearTotal, modified, getMeasurement, onClick }) => (
    <div style={{ overflowX: 'auto' }}>
        <table className="calendar-table calendar-table-landscape">
            <thead>
                <tr>
                    <th>{selectedDate.year}</th>
                    {[...Array(31).keys()].map((d) => (
                        <th key={d}>{d + 1}</th>
                    ))}
                    <th className="total-month">∑</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(12).keys()].map((m) => (
                    <tr key={m}>
                        <th>{Moment({ month: m }).format('MMM')}</th>
                        {[...Array(31).keys()].map((d) => (
                            <TableCell
                                {...{
                                    key: `${m}-${d}`,
                                    selectedDate,
                                    modified,
                                    getMeasurement,
                                    m,
                                    d: d + 1,
                                    onClick,
                                }}
                            />
                        ))}
                        <td className="total-month">{monthlyTotals[m].toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="32" style={{ textAlign: 'right', border: 0, fontWeight: 'bold' }}>
                        &nbsp;
                    </td>
                    <td style={{ textAlign: 'right' }}>{yearTotal.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
    </div>
);
