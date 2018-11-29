import React from 'react';

const TrendIcon = ({ change }) => {
    let colorClass = 'text-grey';
    let iconClass = 'fa fa-arrow-circle-right';

    if (change < 0) {
        colorClass = 'text-red';
        iconClass = 'fa fa-arrow-circle-down';
    } else if (change > 0) {
        colorClass = 'text-green';
        iconClass = 'fa fa-arrow-circle-up';
    }

    return (
        <React.Fragment>
            <small className={colorClass}>
                <i className={iconClass} /> {Math.abs(change)}
            </small>
        </React.Fragment>
    );
};

export default TrendIcon;
