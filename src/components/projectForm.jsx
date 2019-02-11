import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import service from '../services/projectService';
import { getCyclesByProjectId } from '../services/cycleService';
import Cycles from './cycles';

class ProjectForm extends Form {
    state = {
        data: {
            _id: null,
            name: '',
            description: ''
        },
        cycles: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string().required()
    };

    async populateCycles() {
        try {
            const projectId = this.props.match.params.id;
            if (projectId === 'new') return;

            const { data: cycles } = await getCyclesByProjectId(projectId);
            this.setState({ cycles });
        } catch (ex) {}
    }

    async populateProject() {
        try {
            const projectId = this.props.match.params.id;
            if (projectId === 'new') return;

            const { data: project } = await service.getProject(projectId);
            this.setState({ data: this.mapToViewModel(project) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
        }
    }

    mapToViewModel(project) {
        return {
            _id: project._id,
            name: project.name,
            description: project.description
        };
    }

    async componentDidMount() {
        await this.populateProject();
        await this.populateCycles();
    }

    doSubmit = async () => {
        try {
            await service.saveProject(this.state.data);
            return this.props.history.push('/projects');
        } catch (ex) {
            if (ex.response) console.log(ex.response);
        }
    };

    handleNewCycle = () => {
        const projectId = this.props.match.params.id;
        this.props.history.push(`/cycles/new?projectId=${projectId}`);
    };

    render() {
        const { params } = this.props.match;
        const projectId = params.id && params.id !== 'new' ? params.id : null;

        return (
            <React.Fragment>
                <div className="card mb-12 margin-bottom">
                    {projectId && <div className="card-header">Edit Project [ID: {projectId}]</div>}
                    {!projectId && <div className="card-header">Create New Project</div>}
                    <div className="card-body">
                        <div className="card-text">
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput('name', 'Name')}
                                {this.renderInput('description', 'Description')}
                                {this.renderButton('Save')}
                            </form>
                        </div>
                    </div>
                </div>
                {projectId && (
                    <div className="card mb-12">
                        <div className="card-header">Test Cycles</div>
                        <div className="card-body">
                            <div className="card-text">
                                <Cycles projectId={projectId} onNewCyle={this.handleNewCycle} />
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default ProjectForm;
