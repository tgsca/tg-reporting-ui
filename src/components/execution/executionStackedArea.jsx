import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { AreaChart, Area, LineChart, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend } from 'recharts';

const ExecutionStackedArea = ({ resultKpis, milestones }) => {
    return (
        <React.Fragment>
            <LineChart width={960} height={150} data={resultKpis} syncId="execLineArea" margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="reportingDate" hide={true} scale="time" type="number" domain={['auto', 'auto']} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={date => moment(date).format('DD.MM.YYYY HH:mm:ss')} />
                <Line type="monotone" name="Testcase Count" dataKey="totalCount" stroke="#434b89" strokeWidth={2} dot={false} />
            </LineChart>
            <AreaChart width={960} height={400} data={resultKpis} syncId="execLineArea" margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
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
                <Area type="linear" name="Passed" dataKey="passedRatioAbs" stackId="1" stroke="#4fc903" fill="#a1fd68" />
                <Area type="linear" name="Failed" dataKey="failedRatioAbs" stackId="1" stroke="#ca0202" fill="#fd6868" />
                <Area type="linear" name="Blocked" dataKey="blockedRatioAbs" stackId="1" stroke="#ca8102" fill="#fdc668" />
                <Area type="linear" name="Not Completed" dataKey="notCompletedRatioAbs" stackId="1" stroke="#ccbe00" fill="#fff566" />
                <Area type="linear" name="No Run" dataKey="noRunRatioAbs" stackId="1" stroke="#b3b3b3" fill="#b3b3b3" />
                {milestones.map(milestone => (
                    <ReferenceLine
                        key={milestone._id}
                        x={moment(milestone.date).valueOf()}
                        stroke={milestone.color ? milestone.color : 'grey'}
                        strokeDasharray="2 2"
                        label={{
                            position: 'top',
                            value: milestone.label,
                            fill: milestone.color ? milestone.color : 'grey',
                            fontSize: 8
                        }}
                    />
                ))}
                <Brush />
            </AreaChart>
        </React.Fragment>
    );
};

ExecutionStackedArea.propTypes = {
    resultKpis: PropTypes.array.isRequired,
    milestones: PropTypes.array
};

ExecutionStackedArea.defaultProps = {
    milestones: []
};

export default ExecutionStackedArea;
