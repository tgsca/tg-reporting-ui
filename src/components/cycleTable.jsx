import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from './common/table';

class CycleTable extends Component {
    columns = [
        {
            path: 'name',
            label: 'Name',
            content: cycle => (
                <Link to={`/cycles/${cycle._id}`}>{cycle.name}</Link>
            )
        },
        { path: 'version', label: 'Version' },
        {
            path: 'startDate',
            label: 'Start Date',
            content: cycle => (
                <span>{moment(cycle.startDate).format('DD.MM.YYYY')}</span>
            )
        },
        {
            path: 'endDate',
            label: 'End Date',
            content: cycle => (
                <span>{moment(cycle.endDate).format('DD.MM.YYYY')}</span>
            )
        }
    ];

    render() {
        const { cycles, ...rest } = this.props;
        return (
            <Table
                columns={this.columns}
                data={cycles}
                propertyTrKey="_id"
                {...rest}
            />
        );
    }
}

CycleTable.propTypes = {
    cycles: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
};

export default CycleTable;
