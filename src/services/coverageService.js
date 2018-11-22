import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as coverageHelper from './helper/coverage';
import { getLast, getSorted } from './helper/itemArray';
import { formatPercent } from './helper/number';

export function getCoveragesByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/coverages?cycle._id=${cycle._id}`);
}

export function getLastCoverageForPie(coverages) {
    const last = getLast(coverages);
    if (!last._id) return [];
    return coverageHelper.getForPie(last);
}

export function getLastCoverageKpis(coverages) {
    const lastKpis = getLast(getHistoricalCoverageKpis(coverages));
    if (!lastKpis.totalCount) return [];
    return lastKpis;
}

export function getHistoricalCoverageKpis(coverages) {
    const sorted = getSorted(coverages);

    const kpis = [];
    for (let coverage of sorted) {
        let onHoldRatio = coverage.onHold / coverage.sum;
        let inProgressRatio = coverage.inProgress / coverage.sum;
        let openRatio = coverage.open / coverage.sum;
        kpis.push({
            reportingDate: coverage.reportingDate,
            totalCount: coverage.sum,
            coverageRatio: formatPercent(coverage.KPIs.coverageRatio),
            onHoldRatio: formatPercent(onHoldRatio),
            inProgressRatio: formatPercent(inProgressRatio),
            openRatio: formatPercent(openRatio),
            timeElapsedRatio: formatPercent(coverage.KPIs.timeElapsedRatio),
            timeAvailableRatio: formatPercent(coverage.KPIs.timeAvailableRatio)
        });
    }

    return kpis;
}
