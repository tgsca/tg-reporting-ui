import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import DefectPie from './defectPie';
import TrendIcon from '../common/trendIcon';
import { getLast, checkDeltaToLastPeriod } from '../../services/helper/itemArray';

const BugColumn = ({ bugs, bugKpis, milestones, onDetails, onKpiPopover }) => {
    if (bugs.length === 0) return null;

    const currBugKpis = getLast(bugKpis);
    const {
        fixedRatio,
        rejectedRatio,
        openRatio,
        newRatioRel,
        inClarificationRatioRel,
        inImplementationRatioRel,
        inInstallationRatioRel,
        inRetestRatioRel
    } = currBugKpis;

    const currBug = getLast(bugs);
    const { sum, new: open, inClarification, inImplementation, inInstallation, inRetest, closed, rejected } = currBug;

    const nestedClass = 'fa fa-angle-right';

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
                            <td className="text-right">{sum.sum}</td>
                            <td />
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'totalCount', 'number')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Open</td>
                            <td className="text-right">
                                {open.sum + inClarification.sum + inImplementation.sum + inInstallation.sum + inRetest.sum}
                            </td>
                            <td className="text-right">{(openRatio * 1).toFixed(0)} %</td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'openRatio')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> New
                            </td>
                            <td className="text-right">{open.sum}</td>
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
                        <tr>
                            <td>
                                <i className={nestedClass} /> In Clarification
                            </td>
                            <td className="text-right">{inClarification.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(bugKpis, 'inClarificationRatioRel', 'In Clarification Ratio', '#434b89')}
                                >
                                    <div>{(inClarificationRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inClarificationRatioRel')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> In Implementation
                            </td>
                            <td className="text-right">{inImplementation.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(bugKpis, 'inImplementationRatioRel', 'In Implementation Ratio', '#434b89')}
                                >
                                    <div>{(inImplementationRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inImplementationRatioRel')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> In Installation
                            </td>
                            <td className="text-right">{inInstallation.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(bugKpis, 'inInstallationRatioRel', 'In Installation Ratio', '#434b89')}
                                >
                                    <div>{(inInstallationRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inInstallationRatioRel')} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className={nestedClass} /> In Retest
                            </td>
                            <td className="text-right">{inRetest.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(bugKpis, 'inRetestRatioRel', 'In Retest Ratio', '#434b89')}
                                >
                                    <div>{(inRetestRatioRel * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'inRetestRatioRel')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Fixed</td>
                            <td className="text-right">{closed.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(bugKpis, 'fixedRatio', 'Fixed Ratio', '#434b89')}
                                >
                                    <div>{(fixedRatio * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(bugKpis, 'fixedRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Rejected</td>
                            <td className="text-right">{rejected.sum}</td>
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
                    Letztes Update: {moment(bugs[bugs.length - 1].reportingDate).format('DD.MM.YYYY HH:mm')}
                </small>
            </Card.Footer>
        </Card>
    );
};

export default BugColumn;
