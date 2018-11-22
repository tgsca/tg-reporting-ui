import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import CoveragePie from './coveragePie';
import { getHistoricalCoverageKpis, getLastCoverageKpis } from '../../services/coverageService';

const CoverageColumn = ({ coverages, onDetails, onKpiPopover }) => {
    if (coverages.length === 0) return null;

    const histCoverageKpis = getHistoricalCoverageKpis(coverages);
    const currCoverageKpis = getLastCoverageKpis(coverages);
    const { coverageRatio, onHoldRatio, inProgressRatio } = currCoverageKpis;

    return (
        <Card className="">
            <Card.Header>
                <b>Coverage</b> <small onClick={() => onDetails('coverage')}>(click for history)</small>
            </Card.Header>
            <Card.Body>
                <CoveragePie coverages={coverages} />
                <b>Ratios</b>
                <Table hover size="sm">
                    <tbody className="text-small">
                        <tr>
                            <td>Coverage</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'coverageRatio', 'Coverage Ratio', '#434b89')}
                                >
                                    <div>{coverageRatio} %</div>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td>On Hold</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'onHoldRatio', 'On Hold Ratio', '#434b89')}
                                >
                                    <div>{onHoldRatio} %</div>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td>In Progress</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histCoverageKpis, 'inProgressRatio', 'In Progress Ratio', '#666666')}
                                >
                                    <div>{inProgressRatio} %</div>
                                </OverlayTrigger>
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
