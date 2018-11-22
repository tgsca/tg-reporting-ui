import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from './common/table';

class ProjectTable extends Component {
    columns = [
        {
            path: 'name',
            label: 'Name',
            content: project => <Link to={`/projects/${project._id}`}>{project.name}</Link>
        },
        { path: 'description', label: 'Description' },
        {
            key: 'delete',
            content: project => (
                <button onClick={() => this.props.onDelete(project._id)} className="btn btn-danger btn-sm">
                    Delete
                </button>
            )
        }
    ];

    render() {
        const { projects, ...rest } = this.props;
        return <Table columns={this.columns} data={projects} propertyTrKey="_id" {...rest} />;
    }
}

ProjectTable.propTypes = {
    projects: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
};

export default ProjectTable;
