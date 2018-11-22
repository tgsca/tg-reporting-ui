import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getLastDefectForPie } from '../../services/defectService';

/**
 * Status: Rejected ('#d28846'), Closed ('#0f123e'), In Retest, In Installation, In Implementation, In Clarification, New
 * Priority: Urgent, High. Medium, Low, Unrated
 **/
const COLORS = {
    status: ['#4e9f41', '#55b2ce', '#cec327', '#9f9a56', '#9f9f9d'],
    priority: ['#ce5555', '#d28846', '#cec327', '#55b2ce', '#9f9f9d']
};

const DefectPie = ({ defects, view }) => {
    const { data } = getLastDefectForPie(defects, view);

    return (
        <PieChart width={280} height={250}>
            <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                cx={140}
                cy={148}
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={true}
            >
                {data && data.map((entry, index) => <Cell key={index} fill={COLORS[view][index % COLORS[view].length]} />)}
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

export default DefectPie;
