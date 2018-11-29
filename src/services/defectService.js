import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as bugHelper from './helper/defect';
import { getLast, getSorted } from './helper/itemArray';
import { formatPercent } from './helper/number';

export function getDefectsByProject(project) {
    return http.get(`${apiUrl[currentEnvironment]}/defects?project._id=${project._id}`);
}

export function getLastBug(bugs) {
    const last = getLast(bugs);
    if (!last._id) return [];
    return last;
}

export function getLastDefectForPie(defects, view = 'status') {
    const last = getLast(defects);
    if (!last._id) return [];

    let data = {};
    if (view === 'status') {
        const aggregated = bugHelper.getAggregatedByStatus(last);
        data = bugHelper.getStatusForPie(aggregated);
    } else {
        const aggregated = bugHelper.getAggregatedByPriority(last);
        data = bugHelper.getPriorityForPie(aggregated);
    }

    return data;
}

export function getSortedDefects(defects, view = 'status') {
    const sorted = getSorted(defects);

    const aggregated = [];
    for (let defect of sorted) {
        switch (view) {
            case 'status':
                aggregated.push(bugHelper.getAggregatedByStatus(defect));
                break;
            case 'priorityAll':
                aggregated.push(bugHelper.getAggregatedByPriority(defect, { closed: true }));
                break;
            case 'priorityWithoutClosed':
                aggregated.push(bugHelper.getAggregatedByPriority(defect, { closed: false }));
                break;
            default:
                aggregated.push(bugHelper.getAggregatedByStatus(defect));
        }
    }

    return aggregated;
}

export function getHistoricalDefectKpis(defects) {
    const sorted = getSorted(defects);

    const kpis = [];
    for (let defect of sorted) {
        let { reportingDate, sum, new: open, inClarification, inImplementation, inInstallation, inRetest, rejected, closed } = defect;
        let openSum = open.sum + inClarification.sum + inImplementation.sum + inInstallation.sum + inRetest.sum;

        kpis.push({
            reportingDate: reportingDate,
            totalCount: sum.sum,
            openRatio: formatPercent(openSum / sum.sum),
            newRatioRel: formatPercent(open.sum / openSum),
            newRatioAbs: formatPercent(open.sum / sum.sum),
            inClarificationRatioRel: formatPercent(inClarification.sum / openSum),
            inClarificationRatioAbs: formatPercent(inClarification.sum / sum.sum),
            inImplementationRatioRel: formatPercent(inImplementation.sum / openSum),
            inImplementationRatioAbs: formatPercent(inImplementation.sum / sum.sum),
            inInstallationRatioRel: formatPercent(inInstallation.sum / openSum),
            inInstallationRatioAbs: formatPercent(inInstallation.sum / sum.sum),
            inRetestRatioRel: formatPercent(inRetest.sum / openSum),
            inRetestRatioAbs: formatPercent(inRetest.sum / sum.sum),
            fixedRatio: formatPercent(closed.sum / sum.sum),
            rejectedRatio: formatPercent(rejected.sum / sum.sum)
        });
    }

    return kpis;
}

export function getLastDefectKpis(defects) {
    const last = getLast(getHistoricalDefectKpis(defects));
    if (!last.totalCount) return [];
    return last;
}
