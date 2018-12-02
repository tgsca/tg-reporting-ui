import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as bugHelper from './helper/defect';
import { getLast } from './helper/itemArray';

export function getDefectsByProject(project) {
    return http.get(`${apiUrl[currentEnvironment]}/bugs?project._id=${project._id}`);
}

export function getHistoricalBugKpisByProject(project) {
    return http.get(`${apiUrl[currentEnvironment]}/bugKpis?project._id=${project._id}`);
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
    const aggregated = [];
    for (let defect of defects) {
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
