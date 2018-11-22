export function getForPie(coverage) {
    return {
        _id: coverage._id,
        reportingDate: coverage.reportingDate,
        data: [
            { name: 'Covered', value: coverage.covered },
            { name: 'On Hold', value: coverage.onHold },
            { name: 'In Progress', value: coverage.inProgress },
            { name: 'Open', value: coverage.open }
        ]
    };
}
