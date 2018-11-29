import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';
import * as coverageHelper from './helper/coverage';
import { getLast, getSorted } from './helper/itemArray';
import { formatPercent } from './helper/number';

export function getCoveragesByCycle(cycle) {
    return http.get(`${apiUrl[currentEnvironment]}/coverages?cycle._id=${cycle._id}`);
}

export function getLastCoverage(coverages) {
    const last = getLast(coverages);
    if (!last._id) return [];
    return last;
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
        let { sum, covered, onHold, inProgress, open, KPIs } = coverage;
        let coverageRatio = covered / sum;
        let onHoldRatio = onHold / sum;
        let inProgressRatio = inProgress / sum;
        let openRatio = open / sum;
        kpis.push({
            reportingDate: coverage.reportingDate,
            totalCount: sum,
            coverageRatio: formatPercent(coverageRatio),
            onHoldRatio: formatPercent(onHoldRatio),
            inProgressRatio: formatPercent(inProgressRatio),
            openRatio: formatPercent(openRatio),
            timeElapsedRatio: formatPercent(KPIs.timeElapsedRatio),
            timeAvailableRatio: formatPercent(KPIs.timeAvailableRatio)
        });
    }

    return kpis;
}
