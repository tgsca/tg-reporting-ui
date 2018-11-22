import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getLastResultForPie } from '../../services/resultService';

/** Dark colors: Passed, Failed, Blocked, Not Completed, No Run */
const COLORS = ['#5ab620', '#ab1717', '#ca8102', '#ccbe00', '#b3b3b3'];
/** Light colors */
// const COLORS = ['#a1fd68', '#fd6868', '#fdc668', '#fff566', '#b3b3b3'];

const ExecutionPie = ({ results }) => {
    const { data } = getLastResultForPie(results);

    return (
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
                label={false}
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
    );
};

export default ExecutionPie;
