import Moment from 'moment';
import clsx from 'clsx';
import _get from 'lodash/get';

const today = Moment();

export default ({ data, mode, modified, year, m, d, userIsOwner }) => {
    const ymd = Moment([year, m - 1, d]);
    const isValid = ymd.isValid() && ymd.isSameOrBefore(today, 'day');
    const status = modified[JSON.stringify([year, m, d])];
    const measurement = isValid ? _get(data, [mode, year, m, d]) : undefined;

    return (
        <td
            suppressContentEditableWarning
            contentEditable={userIsOwner && isValid}
            inputMode="decimal"
            id={userIsOwner && isValid ? `td${ymd.dayOfYear()}` : undefined}
            tabIndex={userIsOwner && isValid ? ymd.dayOfYear() : undefined}
            data-m={m}
            data-d={d}
            className={clsx(isValid ? 'date' : 'no-date', status)}
        >
            {measurement !== undefined ? measurement : ''}
        </td>
    );
};
