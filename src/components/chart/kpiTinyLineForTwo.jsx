import React from 'react';
import { PropTypes } from 'prop-types';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { getHistoricalResultKpis } from '../../services/resultService';
import moment from 'moment';

const KpiTinyLineForTwo = ({ results, kpi1, kpi2, colWidth }) => {
    const data = getHistoricalResultKpis(results);
    const factor = colWidth / 12;
    return (
        <LineChart width={1100 * factor} height={100} data={data}>
            <Line type="monotone" dataKey={kpi1} stroke="#434b89" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey={kpi2} stroke="#cccccc" strokeWidth={2} dot={false} />
            <XAxis
                hide={true}
                dataKey="reportingDate"
                tickFormatter={tick => moment(tick).format('DD.MM.YYYY')}
                scale="time"
                type="number"
                domain={['auto', 'auto']}
            />
            <YAxis hide={true} />
        </LineChart>
    );
};

KpiTinyLineForTwo.propTypes = {
    results: PropTypes.array.isRequired,
    kpi1: PropTypes.string.isRequired,
    kpi2: PropTypes.string.isRequired
};

export default KpiTinyLineForTwo;
