import React from 'react';

const TrendIcon = ({ change, invert = false }) => {
    let colorClass = 'text-grey';
    let iconClass = 'fa fa-arrow-circle-right';

    if (change < 0) {
        colorClass = !invert ? 'text-red' : 'text-green';
        iconClass = 'fa fa-arrow-circle-down';
    } else if (change > 0) {
        colorClass = !invert ? 'text-green' : 'text-red';
        iconClass = 'fa fa-arrow-circle-up';
    }

    return (
        <React.Fragment>
            <small className={colorClass}>
                {Math.abs(change)} <i className={iconClass} />
            </small>
        </React.Fragment>
    );
};

export default TrendIcon;
