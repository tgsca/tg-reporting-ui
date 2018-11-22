export function getForPie(result) {
    return {
        _id: result._id,
        reportingDate: result.reportingDate,
        data: [
            { name: 'Passed', value: result.passed },
            { name: 'Failed', value: result.failed },
            { name: 'Blocked', value: result.blocked },
            { name: 'Not Completed', value: result.notCompleted },
            { name: 'No Run', value: result.noRun }
        ]
    };
}
