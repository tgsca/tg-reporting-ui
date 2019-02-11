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
            content: cycle => <Link to={`/cycles/${cycle._id}`}>{cycle.name}</Link>
        },
        {
            path: 'status',
            label: 'Status',
            content: cycle => <i className={cycle.status === 'FINISHED' ? 'fa fa-check-circle' : 'fa fa-circle'} />
        },
        { path: 'version', label: 'Version' },
        { path: 'coverages.totalCount', label: 'REQ' },
        {
            path: 'coverages.coverageRatio',
            label: 'Done',
            content: cycle => cycle.coverages.coverageRatio && <span>{Math.round(cycle.coverages.coverageRatio)} %</span>
        },
        {
            path: 'coverages.uncoveredRatio',
            label: 'Open',
            content: cycle => cycle.coverages.uncoveredRatio && <span>{Math.round(cycle.coverages.uncoveredRatio)} %</span>
        },
        { path: 'results.totalCount', label: 'TF' },
        {
            path: 'results.passedRatioAbs',
            label: 'OK',
            content: cycle => cycle.results.passedRatioAbs && <span>{Math.round(cycle.results.passedRatioAbs)} %</span>
        },
        {
            path: 'results.failedRatioAbs',
            label: 'Fail',
            content: cycle => cycle.results.failedRatioAbs && <span>{Math.round(cycle.results.failedRatioAbs)} %</span>
        },
        {
            path: 'results.unexecutedRatio',
            label: '?',
            content: cycle => cycle.results.unexecutedRatio && <span>{Math.round(cycle.results.unexecutedRatio)} %</span>
        },
        {
            path: 'results.blockedRatioAbs',
            label: '(Blocked)',
            content: cycle => cycle.results.blockedRatioAbs && <span>({Math.round(cycle.results.blockedRatioAbs)} %)</span>
        },
        {
            path: 'startDate',
            label: 'Start Date',
            content: cycle => <span>{moment(cycle.startDate).format('DD.MM.YYYY')}</span>
        },
        {
            path: 'endDate',
            label: 'End Date',
            content: cycle => <span>{moment(cycle.endDate).format('DD.MM.YYYY')}</span>
        }
    ];

    render() {
        const { cycles, ...rest } = this.props;
        return <Table columns={this.columns} data={cycles} propertyTrKey="_id" {...rest} />;
    }
}

CycleTable.propTypes = {
    cycles: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
};

export default CycleTable;
