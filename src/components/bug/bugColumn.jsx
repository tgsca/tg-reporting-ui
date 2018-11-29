import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import DefectPie from './defectPie';
import TrendIcon from '../common/trendIcon';
import { getHistoricalDefectKpis, getLastDefectKpis, getLastBug } from '../../services/defectService';
import { checkDeltaToLastPeriod } from '../../services/helper/itemArray';

const BugColumn = ({ bugs, milestones, onDetails, onKpiPopover }) => {
    if (bugs.length === 0) return null;

    const histBugKpis = getHistoricalDefectKpis(bugs);
    const currBugKpis = getLastDefectKpis(bugs);
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

    const currBug = getLastBug(bugs);
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
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'totalCount')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Open</td>
                            <td className="text-right">
                                {open.sum + inClarification.sum + inImplementation.sum + inInstallation.sum + inRetest.sum}
                            </td>
                            <td className="text-right">{openRatio} %</td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'openRatio')} />
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
                                    overlay={() => onKpiPopover(histBugKpis, 'newRatioRel', 'New Ratio', '#434b89')}
                                >
                                    <div>{newRatioRel} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'newRatioRel')} />
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
                                    overlay={() =>
                                        onKpiPopover(histBugKpis, 'inClarificationRatioRel', 'In Clarification Ratio', '#434b89')
                                    }
                                >
                                    <div>{inClarificationRatioRel} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'inClarificationRatioRel')} />
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
                                    overlay={() =>
                                        onKpiPopover(histBugKpis, 'inImplementationRatioRel', 'In Implementation Ratio', '#434b89')
                                    }
                                >
                                    <div>{inImplementationRatioRel} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'inImplementationRatioRel')} />
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
                                    overlay={() => onKpiPopover(histBugKpis, 'inInstallationRatioRel', 'In Installation Ratio', '#434b89')}
                                >
                                    <div>{inInstallationRatioRel} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'inInstallationRatioRel')} />
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
                                    overlay={() => onKpiPopover(histBugKpis, 'inRetestRatioRel', 'In Retest Ratio', '#434b89')}
                                >
                                    <div>{inRetestRatioRel} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'inRetestRatioRel')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Fixed</td>
                            <td className="text-right">{closed.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histBugKpis, 'fixedRatio', 'Fixed Ratio', '#434b89')}
                                >
                                    <div>{fixedRatio} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'fixedRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Rejected</td>
                            <td className="text-right">{rejected.sum}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histBugKpis, 'rejectedRatio', 'Rejected Ratio', '#fdc668')}
                                >
                                    <div>{rejectedRatio} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histBugKpis, 'rejectedRatio')} />
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
