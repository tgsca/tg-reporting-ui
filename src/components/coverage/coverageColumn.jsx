import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import CoveragePie from './coveragePie';
import TrendIcon from '../common/trendIcon';
import { getHistoricalCoverageKpis, getLastCoverageKpis, getLastCoverage } from '../../services/coverageService';
import { checkDeltaToLastPeriod } from '../../services/helper/itemArray';

const CoverageColumn = ({ coverages, onDetails, onKpiPopover }) => {
    if (coverages.length === 0) return null;

    const histCoverageKpis = getHistoricalCoverageKpis(coverages);
    const currCoverageKpis = getLastCoverageKpis(coverages);
    const { coverageRatio, onHoldRatio, inProgressRatio, openRatio } = currCoverageKpis;

    const currCoverage = getLastCoverage(coverages);
    const { sum, covered, onHold, inProgress, open } = currCoverage;

    return (
        <Card className="">
            <Card.Header>
                <b>Coverage</b> <small onClick={() => onDetails('coverage')}>(click for history)</small>
            </Card.Header>
            <Card.Body>
                <CoveragePie coverages={coverages} />
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
                                <TrendIcon change={checkDeltaToLastPeriod(histCoverageKpis, 'totalCount')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Coverage</td>
                            <td className="text-right">{covered}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'coverageRatio', 'Coverage Ratio', '#434b89')}
                                >
                                    <div>{coverageRatio} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histCoverageKpis, 'coverageRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>On Hold</td>
                            <td className="text-right">{onHold}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'onHoldRatio', 'On Hold Ratio', '#434b89')}
                                >
                                    <div>{onHoldRatio} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histCoverageKpis, 'onHoldRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>In Progress</td>
                            <td className="text-right">{inProgress}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'inProgressRatio', 'In Progress Ratio', '#666666')}
                                >
                                    <div>{inProgressRatio} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histCoverageKpis, 'inProgressRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Open</td>
                            <td className="text-right">{open}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'openRatio', 'Open Ratio', '#666666')}
                                >
                                    <div>{openRatio} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(histCoverageKpis, 'openRatio')} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    Letztes Update: {moment(coverages[coverages.length - 1].reportingDate).format('DD.MM.YYYY HH:mm')}
                </small>
            </Card.Footer>
        </Card>
    );
};

export default CoverageColumn;
