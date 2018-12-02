import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ExecutionPie from './executionPie';
import TrendIcon from '../common/trendIcon';
import { getLast, checkDeltaToLastPeriod } from '../../services/helper/itemArray';
import chartConfig from '../../config/chart.json';

function getHeaderClasses(blockedRatio, failedRatio) {
    const warning =
        (chartConfig.limit['blockedRatio'] && chartConfig.limit['blockedRatio'].warning <= blockedRatio) ||
        (chartConfig.limit['failedRatio'] && chartConfig.limit['failedRatio'].warning <= failedRatio)
            ? true
            : false;
    const danger =
        (chartConfig.limit['blockedRatio'] && chartConfig.limit['blockedRatio'].danger <= blockedRatio) ||
        (chartConfig.limit['failedRatio'] && chartConfig.limit['failedRatio'].danger <= failedRatio)
            ? true
            : false;

    if (danger) {
        return 'card-header bg-danger text-white';
    } else if (warning) {
        return 'card-header bg-warning';
    } else {
        return 'card-header';
    }
}

function getTimeElapsedValue(timeElapsedRatio) {
    return timeElapsedRatio > 1 ? '> 100' : (timeElapsedRatio * 100).toFixed(0);
}

const ExecutionColumn = ({ results, resultKpis, milestones, currentCycle, onDetails, onKpiPopover }) => {
    if (results.length === 0) return null;

    const currResultKpis = getLast(resultKpis);
    const {
        totalCount,
        executed,
        executedRatio,
        passed,
        passedRatioRel,
        failed,
        failedRatioRel,
        unexecuted,
        unexecutedRatio,
        blocked,
        blockedRatioRel,
        notCompleted,
        notCompletedRatioRel,
        noRun,
        noRunRatioRel
    } = currResultKpis;

    const { KPIs } = getLast(results);
    const timeElapsedRatio = KPIs.timeElapsedRatio;

    const nestedClass = 'fa fa-angle-right';

    let cardHeaderClass = getHeaderClasses(blockedRatioRel, failedRatioRel);

    return (
        <Card>
            <Card.Header className={cardHeaderClass}>
                <b>Execution</b> <small onClick={() => onDetails('execution')}>(click for history)</small>
            </Card.Header>
            <Card.Body>
                <ExecutionPie results={results} />
                <Table hover size="sm">
                    <thead className="text-small">
                        <tr>
                            <th>Ratio</th>
                            <th className="text-right">#</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody className="text-small">
                        <tr className="table-top-parent">
                            <td>Sum</td>
                            <td className="text-right">{totalCount}</td>
                            <td />
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'totalCount')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Executed</td>
                            <td className="text-right">{executed}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'executedRatio', 'Execution Ratio', '#434b89')}
                                >
                                    <div>{(executedRatio * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'executedRatio')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> Passed
                            </td>
                            <td className="text-right">{passed}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'passedRatioRel', 'Passed Ratio', '#5ab620')}
                                >
                                    <div>{(passedRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'passedRatioRel')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> Failed
                            </td>
                            <td className="text-right">{failed}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'failedRatioRel', 'Failed Ratio', '#fd6868')}
                                >
                                    <div>{(failedRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'failedRatioRel')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Unexecuted</td>
                            <td className="text-right">{unexecuted}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'unexecutedRatio', 'Unexecuted Ratio', '#434b89')}
                                >
                                    <div>{(unexecutedRatio * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'unexecutedRatio')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> Blocked
                            </td>
                            <td className="text-right">{blocked}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'blockedRatioRel', 'Blocked Ratio', '#fdc668')}
                                >
                                    <div>{(blockedRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'blockedRatioRel')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> Not Completed
                            </td>
                            <td className="text-right">{notCompleted}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'notCompletedRatioRel', 'Not Completed Ratio', '#ccbe00')}
                                >
                                    <div>{(notCompletedRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'notCompletedRatioRel')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> No Run
                            </td>
                            <td className="text-right">{noRun}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(resultKpis, 'noRunRatioRel', 'No Run Ratio', '#b3b3b3')}
                                >
                                    <div>{(noRunRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'noRunRatioRel')} />
                            </td>
                        </tr>
                        <tr className="table-top-parent">
                            <td>Time elapsed</td>
                            <td />
                            <td className="text-right">{getTimeElapsedValue(timeElapsedRatio)} %</td>
                            <td />
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    Letztes Update: {moment(results[results.length - 1].reportingDate).format('DD.MM.YYYY HH:mm')}
                </small>
            </Card.Footer>
        </Card>
    );
};

export default ExecutionColumn;
