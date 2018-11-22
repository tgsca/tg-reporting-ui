import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getLastCoverageForPie } from '../../services/coverageService';

const COLORS = ['#1d1d3f', '#e1cc09', '#f9b171', '#b3b3b3'];

const CoveragePie = ({ coverages }) => {
    const { data } = getLastCoverageForPie(coverages);
    return (
        <React.Fragment>
            <PieChart width={280} height={250}>
                <Pie
                    startAngle={180}
                    endAngle={0}
                    cx={140}
                    cy={170}
                    innerRadius={60}
                    outerRadius={120}
                    data={data}
                    dataKey="value"
                    label={true}
                >
                    {data && data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend
                    layout="horizontal"
                    align="left"
                    verticalAlign="top"
                    iconSize={10}
                    iconType="circle"
                    formatter={value => <small>{value}</small>}
                />
                <Tooltip />
            </PieChart>
        </React.Fragment>
    );
};

export default CoveragePie;
