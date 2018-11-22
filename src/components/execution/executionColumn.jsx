import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ExecutionPie from './executionPie';
import { getHistoricalResultKpis, getLastKPIs } from '../../services/resultService';
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

const ExecutionColumn = ({ results, milestones, onDetails, onKpiPopover }) => {
    if (results.length === 0) return null;

    const histResultKpis = getHistoricalResultKpis(results);
    const currResultKpis = getLastKPIs(results);
    const { executionRatio, timeElapsedRatio, blockedRatio, failedRatio } = currResultKpis;

    let cardHeaderClass = getHeaderClasses(blockedRatio, failedRatio);

    return (
        <Card>
            <Card.Header className={cardHeaderClass}>
                <b>Execution</b> <small onClick={() => onDetails('execution')}>(click for history)</small>
            </Card.Header>
            <Card.Body>
                <ExecutionPie results={results} />
                <b>Ratios</b>
                <Table hover size="sm">
                    <tbody className="text-small">
                        <tr>
                            <td>Execution</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histResultKpis, 'executionRatio', 'Execution Ratio', '#434b89')}
                                >
                                    <div>{(executionRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td>Time elapsed</td>
                            <td className="text-right">{(timeElapsedRatio * 100).toFixed(0)} %</td>
                        </tr>
                        <tr>
                            <td>Blocked</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histResultKpis, 'blockedRatio', 'Blocked Ratio', '#fdc668')}
                                >
                                    <div>{(blockedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td>Failed</td>
                            <td className="text-right">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={() => onKpiPopover(histResultKpis, 'failedRatioAbs', 'Failed Ratio', '#fd6868')}
                                >
                                    <div>{(failedRatio * 100).toFixed(0)} %</div>
                                </OverlayTrigger>
                            </td>
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
