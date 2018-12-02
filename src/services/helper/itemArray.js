import { formatTimestampToMilliseconds, sortByTimestamp } from './dateTime';

export function getLast(items) {
    if (items.length === 0) return [];
    return items[items.length - 1];
}

export function getSorted(items) {
    const timestampAttribute = 'reportingDate';
    const formatted = formatTimestampToMilliseconds(items, timestampAttribute);
    return sortByTimestamp(formatted, timestampAttribute);
}

export function checkDeltaToLastPeriod(items, attribute, type = 'percent') {
    if (items.length <= 1) return 0;
    return (items[items.length - 1][attribute] - items[items.length - 2][attribute]).toFixed(0);
}
