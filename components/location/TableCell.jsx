import Moment from 'moment';
import clsx from 'clsx';

export default ({ selectedDate, modified, getMeasurement, m, d, onClick }) => {
    const td = Moment([selectedDate.year, m, d]);
    const sd = Moment(selectedDate);
    const isValid = td.isValid() && td.isSameOrBefore(Moment(), 'day');
    const isActive = isValid && sd.isValid() && td.isSame(sd, 'day');
    const status = modified[JSON.stringify([selectedDate.year, m, d])];
    const measurement = isValid ? getMeasurement(selectedDate.year, m, d) : undefined;
    return (
        <td
            onClick={onClick.bind(isValid ? { year: selectedDate.year, month: m, day: d } : null)}
            className={clsx(isValid ? 'date' : 'no-date', status, { active: isActive })}
        >
            {measurement !== undefined ? measurement : ' '}
        </td>
    );
};
