import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ExecutionPie from './executionPie';
import TrendIcon from '../common/trendIcon';
import { getHistoricalResultKpis, getLastKPIs, getLastResult } from '../../services/resultService';
import { checkDeltaToLastPeriod } from '../../services/helper/itemArray';
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

const ExecutionColumn = ({ results, milestones, currentCycle, onDetails, onKpiPopover }) => {
    if (results.length === 0) return null;

    const histResultKpis = getHistoricalResultKpis(results);
    const currResultKpis = getLastKPIs(results);
    const { executionRatio, timeElapsedRatio, blockedRatio, failedRatio, passedRatio } = currResultKpis;

    const currResult = getLastResult(results);
    const { sum, passed, failed, blocked, notCompleted, noRun } = currResult;

    const nestedClass = 'fa fa-angle-right';

    let cardHeaderClass = getHeaderClasses(blockedRatio, failedRatio);

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
                            <td className="text-right">{sum}</td>
                            <td />
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(results, 'sum')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Executed</td>
                            <td className="text-right">{passed + failed}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histResultKpis, 'executionRatio', 'Execution Ratio', '#434b89')}
                                >
                                    <div>{(executionRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histResultKpis, 'executionRatio')} />
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
                                    overlay={() => onKpiPopover(histResultKpis, 'passedRatioAbs', 'Passed Ratio', '#5ab620')}
                                >
                                    <div>{(passedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histResultKpis, 'passedRatioAbs')} />
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
                                    overlay={() => onKpiPopover(histResultKpis, 'failedRatioAbs', 'Failed Ratio', '#fd6868')}
                                >
                                    <div>{(failedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histResultKpis, 'failedRatioAbs')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Blocked</td>
                            <td className="text-right">{blocked}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histResultKpis, 'blockedRatio', 'Blocked Ratio', '#fdc668')}
                                >
                                    <div>{(blockedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histResultKpis, 'blockedRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Unexecuted</td>
                            <td className="text-right">{notCompleted + noRun}</td>
                            <td className="text-right">{(((notCompleted + noRun) / sum) * 100).toFixed(0)} %</td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histResultKpis, 'unexecutedRatio')} />
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
