import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as resultHelper from './helper/result';
import { getLast } from './helper/itemArray';

export function getResultsByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/results?cycle._id=${cycle._id}`);
}

export function getResultKpisByProjectId(projectId) {
    return http.get(`${apiUrl[currentEnvironment]}/resultKpis?cycle.project._id=${projectId}`);
}

export function getResultKpisByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/resultKpis?cycle._id=${cycle._id}`);
}

export function getResultKpis() {
    return http.get(`${apiUrl[currentEnvironment]}/resultKpis`);
}

export function getLastResultForPie(results) {
    const last = getLast(results);
    if (!last._id) return [];
    return resultHelper.getForPie(last);
}

export function getHistoricalResultKpiForSparkline(histKpis, kpi) {
    const data = [];

    for (let date of histKpis) {
        data.push(date[kpi]);
    }

    return data;
}
