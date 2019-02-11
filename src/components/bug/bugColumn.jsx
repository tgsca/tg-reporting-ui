import React, { Component } from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import DefectPie from './defectPie';
import TrendIcon from '../common/trendIcon';
import { getLast, checkDeltaToLastPeriod } from '../../services/helper/itemArray';

class BugColumn extends Component {
    state = {
        openCollapsed: true
    };

    toggleOpenCollapsed = () => {
        this.setState({ openCollapsed: !this.state.openCollapsed });
    };

    render() {
        const { bugs, bugKpis, milestones, onDetails, onKpiPopover } = this.props;

        if (bugs.length === 0) return null;

        const currBugKpis = getLast(bugKpis);
        const {
            totalCount,
            rejected,
            rejectedRatio,
            open,
            new: n,
            newRatioRel,
            inClarification,
            inClarificationRatioRel,
            inImplementation,
            inImplementationRatioRel,
            inInstallation,
            inInstallationRatioRel,
            inRetest,
            inRetestRatioAbs,
            closed,
            closedRatio
        } = currBugKpis;

        const { openCollapsed } = this.state;
        const nestedOpenClass = openCollapsed ? 'fa fa-arrow-circle-right' : 'fa fa-arrow-circle-down';
        const nestedChildClass = 'fa fa-angle-double-right text-intend-10';
        const nestedParentClass = 'fa fa-angle-right';

        return (
            <Card className="">
                <Card.Header>
                    <b>Bugs</b> <small onClick={() => onDetails('bug')}>(click for history)</small>
                </Card.Header>
                <Card.Body>
                    <DefectPie defects={bugs} view="status" />
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
                                    <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'totalCount', 'number')} />
                                </td>
                            </tr>
                            <tr className="table-parent" onClick={this.toggleOpenCollapsed}>
                                <td>
                                    <i className={nestedOpenClass} /> Open
                                </td>
                                <td className="text-right">{open - inRetest}</td>
                                <td className="text-right">{(((open - inRetest) / totalCount) * 100).toFixed(0)} %</td>
                                <td className="text-right" />
                            </tr>
                            {!openCollapsed && (
                                <tr>
                                    <td>
                                        <i className={nestedChildClass} /> New
                                    </td>
                                    <td className="text-right">{n}</td>
                                    <td className="text-right">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={() => onKpiPopover(bugKpis, 'newRatioRel', 'New Ratio', '#434b89')}
                                        >
                                            <div>{(newRatioRel * 1).toFixed(0)} %</div>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="text-right">
                                        <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'newRatioRel')} />
                                    </td>
                                </tr>
                            )}
                            {!openCollapsed && (
                                <tr>
                                    <td>
                                        <i className={nestedChildClass} /> In Clarification
                                    </td>
                                    <td className="text-right">{inClarification}</td>
                                    <td className="text-right">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={() =>
                                                onKpiPopover(bugKpis, 'inClarificationRatioRel', 'In Clarification Ratio', '#434b89')
                                            }
                                        >
                                            <div>{(inClarificationRatioRel * 1).toFixed(0)} %</div>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="text-right">
                                        <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inClarificationRatioRel')} />
                                    </td>
                                </tr>
                            )}
                            {!openCollapsed && (
                                <tr>
                                    <td>
                                        <i className={nestedChildClass} /> In Implementation
                                    </td>
                                    <td className="text-right">{inImplementation}</td>
                                    <td className="text-right">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={() =>
                                                onKpiPopover(bugKpis, 'inImplementationRatioRel', 'In Implementation Ratio', '#434b89')
                                            }
                                        >
                                            <div>{(inImplementationRatioRel * 1).toFixed(0)} %</div>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="text-right">
                                        <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inImplementationRatioRel')} />
                                    </td>
                                </tr>
                            )}
                            {!openCollapsed && (
                                <tr>
                                    <td>
                                        <i className={nestedChildClass} /> In Installation
                                    </td>
                                    <td className="text-right">{inInstallation}</td>
                                    <td className="text-right">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={() =>
                                                onKpiPopover(bugKpis, 'inInstallationRatioRel', 'In Installation Ratio', '#434b89')
                                            }
                                        >
                                            <div>{(inInstallationRatioRel * 1).toFixed(0)} %</div>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="text-right">
                                        <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inInstallationRatioRel')} />
                                    </td>
                                </tr>
                            )}
                            <tr className="table-parent">
                                <td>
                                    <i className={nestedParentClass} /> In Retest
                                </td>
                                <td className="text-right">{inRetest}</td>
                                <td className="text-right">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={() => onKpiPopover(bugKpis, 'inRetestRatioAbs', 'In Retest Ratio', '#434b89')}
                                    >
                                        <div>{(inRetestRatioAbs * 1).toFixed(0)} %</div>
                                    </OverlayTrigger>
                                </td>
                                <td className="text-right">
                                    <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inRetestRatioAbs')} />
                                </td>
                            </tr>
                            <tr className="table-parent">
                                <td>
                                    <i className={nestedParentClass} /> Fixed
                                </td>
                                <td className="text-right">{closed}</td>
                                <td className="text-right">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={() => onKpiPopover(bugKpis, 'closedRatio', 'Closed Ratio', '#434b89')}
                                    >
                                        <div>{(closedRatio * 1).toFixed(0)} %</div>
                                    </OverlayTrigger>
                                </td>
                                <td className="text-right">
                                    <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'closedRatio')} />
                                </td>
                            </tr>
                            <tr className="table-parent">
                                <td>
                                    <i className={nestedParentClass} /> Rejected
                                </td>
                                <td className="text-right">{rejected}</td>
                                <td className="text-right">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={() => onKpiPopover(bugKpis, 'rejectedRatio', 'Rejected Ratio', '#fdc668')}
                                    >
                                        <div>{(rejectedRatio * 1).toFixed(0)} %</div>
                                    </OverlayTrigger>
                                </td>
                                <td className="text-right">
                                    <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'rejectedRatio')} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Letztes Update: {moment.utc(bugs[bugs.length - 1].reportingDate).format('DD.MM.YYYY HH:mm')}
                    </small>
                </Card.Footer>
            </Card>
        );
    }
}

export default BugColumn;
