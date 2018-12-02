import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { AreaChart, Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend, Brush } from 'recharts';
import { getSortedDefects } from '../../services/defectService';

const DefectStackedArea = ({ defects, milestones }) => {
    const sortedStatus = getSortedDefects(defects, 'status');
    const sortedPriority = getSortedDefects(defects, 'priorityWithoutClosed');

    const areaLabel = {
        // fill: 'white',
        // fontSize: 12,
        // position: 'insideTop',
        // value: 'absolute'
    };

    return (
        <React.Fragment>
            <ComposedChart
                width={960}
                height={150}
                data={sortedStatus}
                syncId="bugLineArea"
                margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="reportingDate" hide={true} scale="time" type="number" domain={['auto', 'auto']} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={date => moment(date).format('DD.MM.YYYY HH:mm:ss')} />
                <Line type="monotone" name="Total Count" dataKey="totalCount" stroke="#01042d" strokeWidth={2} dot={false} />
                <Area type="monotone" name="Closed" dataKey="closed" stackId="1" stroke="#01042d" fill="#01042d" />
                <Area type="monotone" name="Rejected" dataKey="rejected" stackId="1" stroke="#ca8102" fill="#fdc668" />
            </ComposedChart>
            <AreaChart
                width={960}
                height={400}
                data={sortedStatus}
                syncId="bugLineArea"
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
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={label => moment(label).format('DD.MM.YYYY HH:mm:ss')} />
                {/* <Area type="linear" dataKey="closed" stackId="1" stroke="#0f123e" fill="#0f123e" /> */}
                <Area type="linear" dataKey="inRetest" name="In Retest" stackId="1" stroke="#4e9f41" fill="#4e9f41" />
                <Area type="linear" dataKey="inInstallation" name="In Installation" stackId="1" stroke="#55b2ce" fill="#55b2ce" />
                <Area type="linear" dataKey="inImplementation" name="In Implementation" stackId="1" stroke="#cec327" fill="#cec327" />
                <Area type="linear" dataKey="inClarification" name="In Clarification" stackId="1" stroke="#9f9a56" fill="#9f9a56" />
                <Area type="linear" dataKey="new" stackId="1" name="New" stroke="#9f9f9d" fill="#9f9f9d" />
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
                            fontSize: 10
                        }}
                    />
                ))}
                <Legend iconType="circle" iconSize={10} formatter={value => <small>{value}</small>} />
            </AreaChart>
            <AreaChart
                width={960}
                height={400}
                data={sortedPriority}
                syncId="bugLineArea"
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
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={label => moment(label).format('DD.MM.YYYY HH:mm:ss')} />
                <Area type="linear" dataKey="urgent" name="Urgent" stackId="1" stroke="#ce5555" fill="#ce5555" />
                <Area type="linear" dataKey="high" name="High" stackId="1" stroke="#d28846" fill="#d28846" />
                <Area type="linear" dataKey="medium" name="Medium" stackId="1" stroke="#cec327" fill="#cec327" />
                <Area type="linear" dataKey="low" name="Low" stackId="1" stroke="#55b2ce" fill="#55b2ce" />
                <Area type="linear" dataKey="unrated" name="Unrated" stackId="1" stroke="#9f9f9d" fill="#9f9f9d" />
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
                            fontSize: 10
                        }}
                    />
                ))}
                <Legend iconType="circle" iconSize={10} formatter={value => <small>{value}</small>} />
                <Brush />
            </AreaChart>
        </React.Fragment>
    );
};

DefectStackedArea.propTypes = {
    defects: PropTypes.array.isRequired,
    milestones: PropTypes.array
};

DefectStackedArea.defaultProps = {
    milestones: []
};

export default DefectStackedArea;
