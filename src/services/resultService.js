import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as resultHelper from './helper/result';
import { getLast, getSorted } from './helper/itemArray';
import { formatPercent } from './helper/number';

export function getResultsByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/results?cycle._id=${cycle._id}`);
}

export function getLastResultForPie(results) {
    const last = getLast(results);
    if (!last._id) return [];
    return resultHelper.getForPie(last);
}

export function getSortedResults(results) {
    return getSorted(results);
}

export function getHistoricalResultKpis(results) {
    const sorted = getSorted(results);

    const kpis = [];
    for (let result of sorted) {
        let { reportingDate, KPIs } = result;
        let { executionRatio, passedRatio, failedRatio, blockedRatio, timeElapsedRatio, timeAvailableRatio } = KPIs;

        kpis.push({
            reportingDate: reportingDate,
            executionRatio: formatPercent(executionRatio),
            passedRatioAbs: formatPercent(passedRatio),
            passedRatioRel: formatPercent(passedRatio * executionRatio),
            failedRatioAbs: formatPercent(failedRatio),
            failedRatioRel: formatPercent(failedRatio * executionRatio),
            blockedRatio: formatPercent(blockedRatio),
            unexecutedRatio: formatPercent(1 - executionRatio - blockedRatio),
            testcaseTotalCount: result.sum,
            timeElapsedRatio: formatPercent(timeElapsedRatio),
            timeAvailableRatio: formatPercent(timeAvailableRatio)
        });
    }

    return kpis;
}

export function getHistoricalResultKpiForSparkline(histKpis, kpi) {
    const data = [];

    for (let date of histKpis) {
        data.push(date[kpi]);
    }

    return data;
}

export function getLastKPIs(results) {
    const last = getLast(results);
    if (!last._id) return [];
    return last.KPIs;
}
