import Moment from 'moment';
import clsx from 'clsx';
import _get from 'lodash/get';

// https://stackoverflow.com/a/58153867/5165
const onKeyPress = (e) => {
    const x = e.charCode || e.keyCode;
    /* eslint-disable no-restricted-globals */
    if (
        (isNaN(String.fromCharCode(e.which)) && x !== 45 && x !== 46) ||
        x === 32 ||
        x === 13 ||
        (x === 46 && e.currentTarget.innerText.includes('.'))
    )
        e.preventDefault();
    /* eslint-enable no-restricted-globals */
};

// https://stackoverflow.com/a/3805897/5165
const onFocus = () => {
    if (document && document.execCommand) {
        setTimeout(() => document.execCommand('selectAll', false, null), 1);
    }
};

export default ({ data, mode, modified, today, year, m, d, onBlur, userIsOwner }) => {
    const td = Moment([year, m - 1, d]);
    const isValid = td.isValid() && td.isSameOrBefore(today, 'day');
    const status = modified[JSON.stringify([year, m, d])];
    const measurement = isValid ? _get(data, [mode, year, m, d]) : undefined;

    return (
        <td
            suppressContentEditableWarning
            contentEditable={userIsOwner && isValid}
            onBlur={userIsOwner && isValid ? onBlur : undefined}
            onFocus={userIsOwner && isValid ? onFocus : undefined}
            onKeyPress={userIsOwner && isValid ? onKeyPress : undefined}
            data-m={m}
            data-d={d}
            className={clsx(isValid ? 'date' : 'no-date', status)}
        >
            {measurement !== undefined ? measurement : ''}
        </td>
    );
};
