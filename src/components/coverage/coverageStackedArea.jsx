import React from 'react';
import moment from 'moment';
import { AreaChart, Area, LineChart, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CoverageStackedArea = ({ coverageKpis }) => {
    return (
        <React.Fragment>
            <LineChart
                width={960}
                height={150}
                data={coverageKpis}
                syncId="covLineArea"
                margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="reportingDate" hide={true} scale="time" type="number" domain={['auto', 'auto']} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={date => moment(date).format('DD.MM.YYYY HH:mm:ss')} />
                <Line type="monotone" name="Total Count" dataKey="totalCount" stroke="#01042d" strokeWidth={2} dot={false} />
            </LineChart>
            <AreaChart
                width={960}
                height={400}
                data={coverageKpis}
                syncId="covLineArea"
                margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis
                    dataKey="reportingDate"
                    tickFormatter={tick => moment(tick).format('DD.MM.YYYY')}
                    scale="time"
                    type="number"
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 12 }}
                />
                <YAxis tickFormatter={tick => (tick * 1).toFixed(0)} tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip labelFormatter={label => moment(label).format('DD.MM.YYYY HH:mm:ss')} />
                <Legend iconType="circle" iconSize={10} formatter={value => <small>{value}</small>} />
                <Area type="linear" name="Covered" dataKey="coverageRatio" stackId="1" stroke="#01042d" fill="#01042d" />
                <Area type="linear" name="Blocked" dataKey="blockedRatioAbs" stackId="1" stroke="#d28846" fill="#d28846" />
                <Area type="linear" name="In Progress" dataKey="inProgressRatioAbs" stackId="1" stroke="#666666" fill="#b3b3b3" />
                <Area type="linear" name="Open" dataKey="openRatioAbs" stackId="1" stroke="#aaaaaa" fill="#e3e3e3" />
                <Brush />
            </AreaChart>
        </React.Fragment>
    );
};

export default CoverageStackedArea;
