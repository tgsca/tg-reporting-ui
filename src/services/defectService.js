import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as bugHelper from './helper/defect';
import { getLast, getSorted } from './helper/itemArray';
import { formatPercent } from './helper/number';

export function getDefectsByProject(project) {
    return http.get(`${apiUrl[currentEnvironment]}/defects?project._id=${project._id}`);
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
        kpis.push({
            reportingDate: defect.reportingDate,
            fixedRatio: formatPercent(defect.KPIs.fixedRatio),
            rejectedRatio: formatPercent(defect.KPIs.rejectedRatio)
        });
    }

    return kpis;
}

export function getLastDefectKpis(defects) {
    const last = getLast(defects);
    if (!last._id) return [];
    return last.KPIs;
}
