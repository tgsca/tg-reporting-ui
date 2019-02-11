import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as coverageHelper from './helper/coverage';
import { getLast } from './helper/itemArray';

export function getCoveragesByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/coverages?cycle._id=${cycle._id}`);
}

export function getCoverageKpisByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/coverageKpis?cycle._id=${cycle._id}`);
}

export function getCoverageKpis() {
    return http.get(`${apiUrl[currentEnvironment]}/coverageKpis`);
}

export function getLastCoverageForPie(coverages) {
    const last = getLast(coverages);
    if (!last._id) return [];
    return coverageHelper.getForPie(last);
}
