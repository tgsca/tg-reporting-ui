import React, { Component } from 'react';
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
    return timeElapsedRatio > 100 ? '> 100' : (timeElapsedRatio * 1).toFixed(0);
}

class ExecutionColumn extends Component {
    state = {
        executedCollapsed: true
    };

    toggleExecutedCollapsed = () => {
        this.setState({ executedCollapsed: !this.state.executedCollapsed });
    };

    render() {
        const { results, resultKpis, milestones, currentCycle, currentCycleKpis, onDetails, onKpiPopover } = this.props;
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
            blocked,
            blockedRatioAbs,
            notCompleted,
            notCompletedRatioAbs,
            noRun,
            noRunRatioAbs
        } = currResultKpis;

        const { timeElapsedRatio } = currentCycleKpis;
        const { executedCollapsed } = this.state;

        const nestedExecutedClass = executedCollapsed ? 'fa fa-arrow-circle-right' : 'fa fa-arrow-circle-down';
        const nestedChildClass = 'fa fa-angle-double-right text-intend-10';
        const nestedParentClass = 'fa fa-angle-right';
        let cardHeaderClass = getHeaderClasses(blockedRatioAbs, failedRatioRel);

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
                            <tr className="table-parent" onClick={this.toggleExecutedCollapsed}>
                                <td>
                                    <i className={nestedExecutedClass} /> Executed
                                </td>
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
                            {!executedCollapsed && (
                                <tr>
                                    <td>
                                        <i className={nestedChildClass} /> Passed
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
                            )}
                            {!executedCollapsed && (
                                <tr>
                                    <td>
                                        <i className={nestedChildClass} /> Failed
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
                            )}
                            <tr className="table-parent">
                                <td>
                                    <i className={nestedParentClass} /> Blocked
                                </td>
                                <td className="text-right">{blocked}</td>
                                <td className="text-right">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={() => onKpiPopover(resultKpis, 'blockedRatioAbs', 'Blocked Ratio', '#fdc668')}
                                    >
                                        <div>{(blockedRatioAbs * 1).toFixed(0)} %</div>
                                    </OverlayTrigger>
                                </td>
                                <td className="text-right">
                                    <TrendIcon change={checkDeltaToLastPeriod(resultKpis, 'blockedRatioAbs')} />
                                </td>
                            </tr>
                            <tr className="table-parent">
                                <td>
                                    <i className={nestedParentClass} /> Not Executed
                                </td>
                                <td className="text-right">{noRun + notCompleted}</td>
                                <td className="text-right">
                                    <div>{(noRunRatioAbs + notCompletedRatioAbs).toFixed(0)} %</div>
                                </td>
                                <td />
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
    }
}

export default ExecutionColumn;
