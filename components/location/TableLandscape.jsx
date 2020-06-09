import Moment from 'moment';
import _get from 'lodash/get';
import _range from 'lodash/range';
import TableCell from './TableCell';

export default ({
    today,
    year,
    data,
    mode,
    modified,
    onBlur,
    monthlyTotals,
    yearlyTotals,
    toFixed,
    userIsOwner,
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
                    {_range(12).map((m) => (
                        <tr key={m}>
                            <th>{Moment({ month: m }).format('MMM')}</th>
                            {_range(31).map((d) => (
                                <TableCell
                                    {...{
                                        key: `${m}-${d}`,
                                        data,
                                        mode,
                                        modified,
                                        today,
                                        year,
                                        m: m + 1,
                                        d: d + 1,
                                        onBlur,
                                        userIsOwner,
                                    }}
                                />
                            ))}
                            <td className="total total-right">
                                {toFixed(_get(monthlyTotals, [year, m + 1]))}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="32" style={{ border: 0, background: 'inherit' }}>
                            &nbsp;
                        </td>
                        <td className="total total-right">{toFixed(_get(yearlyTotals, [year]))}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
