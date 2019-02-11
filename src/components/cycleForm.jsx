import React from 'react';
import Joi from 'joi-browser';
import query from 'query-string';
import Form from './common/form';
import service from '../services/cycleService';
import { getProjects } from '../services/projectService';

class CycleForm extends Form {
    state = {
        data: {
            name: '',
            version: '',
            startDate: '',
            endDate: '',
            projectId: '',
            status: ''
        },
        projects: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        name: Joi.string().required(),
        version: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        projectId: Joi.string().required(),
        status: Joi.string().required()
    };

    async populateCycle() {
        try {
            const cycleId = this.props.match.params.id;
            if (cycleId === 'new') {
                const { projectId } = query.parse(this.props.location.search);
                this.setState({ data: { projectId } });
                return;
            }

            const { data: cycle } = await service.getCycle(cycleId);
            this.setState({ data: this.mapToViewModel(cycle) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
        }
    }

    async populateProjects() {
        const { data: projects } = await getProjects();
        this.setState({ projects });
    }

    mapToViewModel(cycle) {
        return {
            _id: cycle._id,
            name: cycle.name,
            version: cycle.version,
            startDate: cycle.startDate,
            endDate: cycle.endDate,
            projectId: cycle.project._id,
            status: cycle.status
        };
    }

    async componentDidMount() {
        await this.populateCycle();
        await this.populateProjects();
    }

    doSubmit = async () => {
        try {
            await service.saveCycle(this.state.data);

            const { state } = this.props.location;
            const target = state ? state.from.pathname : '/projects';
            return this.props.history.push(target);
        } catch (ex) {
            if (ex.response) console.log(ex.response);
        }
    };

    render() {
        const { params } = this.props.match;
        const cycleId = params.id && params.id !== 'new' ? params.id : null;

        return (
            <React.Fragment>
                <div className="card mb-12 margin-bottom">
                    {cycleId && <div className="card-header">Edit Cycle [ID: {this.props.match.params.id}]</div>}
                    {!cycleId && <div className="card-header">Create New Cycle</div>}
                    <div className="card-body">
                        <div className="card-text">
                            <form onSubmit={this.handleSubmit}>
                                {this.renderSelect('projectId', 'Project', this.state.projects)}
                                {this.renderInput('name', 'Name')}
                                {this.renderInput('version', 'Version')}
                                {this.renderSelect('status', 'Status', [
                                    { _id: 'PLANNED', name: 'PLANNED' },
                                    { _id: 'RUNNING', name: 'RUNNING' },
                                    { _id: 'PAUSED', name: 'PAUSED' },
                                    { _id: 'FINISHED', name: 'FINISHED' }
                                ])}
                                {this.renderInput('startDate', 'Start Date')}
                                {this.renderInput('endDate', 'End Date')}
                                {this.renderButton('Save')}
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CycleForm;
