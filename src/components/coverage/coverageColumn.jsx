import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import CoveragePie from './coveragePie';
import TrendIcon from '../common/trendIcon';
import { getLast, checkDeltaToLastPeriod } from '../../services/helper/itemArray';

const CoverageColumn = ({ coverages, coverageKpis, onDetails, onKpiPopover }) => {
    if (coverages.length === 0) return null;

    const currCoverageKpis = getLast(coverageKpis);
    const {
        totalCount,
        covered,
        coverageRatio,
        blocked,
        blockedRatioAbs,
        inProgress,
        inProgressRatioAbs,
        open,
        openRatioAbs
    } = currCoverageKpis;

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
                            <td className="text-right">{totalCount}</td>
                            <td />
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(coverageKpis, 'totalCount')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Coverage</td>
                            <td className="text-right">{covered}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(coverageKpis, 'coverageRatio', 'Coverage Ratio', '#434b89')}
                                >
                                    <div>{(coverageRatio * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(coverageKpis, 'coverageRatio')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Blocked</td>
                            <td className="text-right">{blocked}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(coverageKpis, 'blockedRatioAbs', 'On Hold Ratio', '#434b89')}
                                >
                                    <div>{(blockedRatioAbs * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(coverageKpis, 'blockedRatioAbs')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>In Progress</td>
                            <td className="text-right">{inProgress}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(coverageKpis, 'inProgressRatioAbs', 'In Progress Ratio', '#666666')}
                                >
                                    <div>{(inProgressRatioAbs * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(coverageKpis, 'inProgressRatioAbs')} />
                            </td>
                        </tr>
                        <tr className="table-parent">
                            <td>Open</td>
                            <td className="text-right">{open}</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(coverageKpis, 'openRatioAbs', 'Open Ratio', '#666666')}
                                >
                                    <div>{(openRatioAbs * 1).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                            <td className="text-right">
                                <TrendIcon change={checkDeltaToLastPeriod(coverageKpis, 'openRatioAbs')} />
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
