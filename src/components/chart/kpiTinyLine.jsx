import React from 'react';
import { PropTypes } from 'prop-types';
import { Sparklines, SparklinesCurve } from 'react-sparklines';
import { getHistoricalResultKpiForSparkline } from '../../services/resultService';

const KpiTinyLine = ({ histKpis, kpi, color = null }) => {
    const sparklineRatio = getHistoricalResultKpiForSparkline(histKpis, kpi);
    return (
        <Sparklines data={sparklineRatio}>
            <SparklinesCurve color={color} />
        </Sparklines>
    );
};

KpiTinyLine.propTypes = {
    histKpis: PropTypes.array.isRequired,
    kpi: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default KpiTinyLine;
