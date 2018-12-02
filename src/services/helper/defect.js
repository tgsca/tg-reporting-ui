import moment from 'moment';

export function getStatusForPie(defect) {
    return {
        _id: defect.id,
        reportingDate: defect.reportingDate,
        data: [
            // { name: 'Rejected', value: defect.rejected },
            // { name: 'Closed', value: defect.closed },
            { name: 'In Retest', value: defect.inRetest },
            { name: 'In Installation', value: defect.inInstallation },
            { name: 'In Implementation', value: defect.inImplementation },
            { name: 'In Clarification', value: defect.inClarification },
            { name: 'New', value: defect.new }
        ]
    };
}

export function getPriorityForPie(defect) {
    return {
        _id: defect.id,
        reportingDate: defect.reportingDate,
        data: [
            { name: 'Urgent', value: defect.urgent },
            { name: 'High', value: defect.high },
            { name: 'Medium', value: defect.medium },
            { name: 'Low', value: defect.low },
            { name: 'Unrated', value: defect.unrated }
        ]
    };
}

export function getAggregatedByStatus(defect) {
    return {
        _id: defect.id,
        reportingDate: moment(defect.reportingDate).valueOf(),
        rejected: defect.rejected.sum,
        closed: defect.closed.sum,
        inRetest: defect.inRetest.sum,
        inInstallation: defect.inInstallation.sum,
        inImplementation: defect.inImplementation.sum,
        inClarification: defect.inClarification.sum,
        new: defect.new.sum,
        totalCount: defect.sum.sum,
        KPIs: { ...defect.KPIs }
    };
}

export function getAggregatedByPriority(defect, options) {
    return {
        _id: defect.id,
        reportingDate: moment(defect.reportingDate).valueOf(),
        urgent: getPrioritySum(defect, 'urgent', options),
        high: getPrioritySum(defect, 'high', options),
        medium: getPrioritySum(defect, 'medium', options),
        low: getPrioritySum(defect, 'low', options),
        unrated: getPrioritySum(defect, 'unrated', options),
        totalCount: defect.sum.sum,
        KPIs: { ...defect.KPIs }
    };
}

function getPrioritySum(defect, priority, options) {
    let closed = 0;
    let rejected = 0;
    if (options.closed) {
        closed = defect.closed[priority];
        rejected = defect.rejected[priority];
    }

    return (
        rejected +
        closed +
        defect.inRetest[priority] +
        defect.inInstallation[priority] +
        defect.inImplementation[priority] +
        defect.inClarification[priority] +
        defect.new[priority]
    );
}
