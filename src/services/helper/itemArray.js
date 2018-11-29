import moment from 'moment';
import { formatTimestampToMilliseconds, sortByTimestamp } from './dateTime';

export function getLast(items) {
    let last = {
        reportingDate: new Date('1970-01-01').toUTCString(),
        _id: null
    };
    for (let item of items) {
        last = moment(last.reportingDate).isSameOrBefore(moment(item.reportingDate)) ? item : last;
    }

    return last;
}

export function getSorted(items) {
    const timestampAttribute = 'reportingDate';
    const formatted = formatTimestampToMilliseconds(items, timestampAttribute);
    return sortByTimestamp(formatted, timestampAttribute);
}

export function checkDeltaToLastPeriod(items, attribute) {
    if (items.length <= 1) return 0;
    const sorted = getSorted(items);
    return sorted[sorted.length - 1][attribute] - sorted[sorted.length - 2][attribute];
}
