import moment from "moment";
import _ from "lodash";

export function formatTimestampToMilliseconds(collection, timestampAttr) {
    const formatted = [];
    for (let object of collection) {
        const index = collection.indexOf(object);
        formatted[index] = { ...object };
        formatted[index][timestampAttr] = moment(
            object[timestampAttr]
        ).valueOf();
    }
    return formatted;
}

export function sortByTimestamp(collection, timestampAttr) {
    return _.orderBy(collection, [timestampAttr], ["asc"]);
}
