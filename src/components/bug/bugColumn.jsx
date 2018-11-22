import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import DefectPie from './defectPie';
import { getHistoricalDefectKpis, getLastDefectKpis } from '../../services/defectService';

const BugColumn = ({ bugs, milestones, onDetails, onKpiPopover }) => {
    if (bugs.length === 0) return null;

    const histBugKpis = getHistoricalDefectKpis(bugs);
    const currBugKpis = getLastDefectKpis(bugs);
    const { fixedRatio, rejectedRatio } = currBugKpis;

    return (
        <Card className="">
            <Card.Header>
                <b>Bugs</b> <small onClick={() => onDetails('bug')}>(click for history)</small>
            </Card.Header>
            <Card.Body>
                <DefectPie defects={bugs} view="status" />
                <b>Ratios</b>
                <Table hover size="sm">
                    <tbody className="text-small">
                        <tr>
                            <td>Fixed</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histBugKpis, 'fixedRatio', 'Fixed Ratio', '#434b89')}
                                >
                                    <div>{(fixedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td>Rejected</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histBugKpis, 'rejectedRatio', 'Rejected Ratio', '#fdc668')}
                                >
                                    <div>{(rejectedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
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
