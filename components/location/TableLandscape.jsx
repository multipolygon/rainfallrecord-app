import Moment from 'moment';
import TableCell from './TableCell';

export default ({
    selectedDate,
    monthlyTotals,
    toFixed,
    yearTotal,
    modified,
    getMeasurement,
    onClick,
}) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="calendar-table calendar-table-landscape">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        {[...Array(31).keys()].map((d) => (
                            <th key={d}>{d + 1}</th>
                        ))}
                        <th>&nbsp;</th>
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
                            <td className="total total-right">{toFixed(monthlyTotals[m])}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="32" style={{ border: 0, background: 'inherit' }}>
                            &nbsp;
                        </td>
                        <td className="total total-right">{toFixed(yearTotal)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
