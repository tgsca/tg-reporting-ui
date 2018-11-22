import React, { Component } from 'react';
import CardGroup from 'react-bootstrap/lib/CardGroup';
import Popover from 'react-bootstrap/lib/Popover';
import CoverageColumn from './coverage/coverageColumn';
import ExecutionColumn from './execution/executionColumn';
import BugColumn from './bug/bugColumn';
import { getProjects } from '../services/projectService';
import { getMilestonesByProject } from '../services/milestoneService';
import { getCyclesByProject } from '../services/cycleService';
import { getResultsByCycle } from '../services/resultService';
import { getCoveragesByCycle } from '../services/coverageService';
import { getDefectsByProject } from '../services/defectService';
import PillGroup from './common/pillGroup';
import TabGroup from './common/tabGroup';
import CoverageStackedArea from './coverage/coverageStackedArea';
import ExecutionStackedArea from './execution/executionStackedArea';
import DefectStackedArea from './bug/defectStackedArea';
import KpiTinyLine from './chart/kpiTinyLine';

class Dashboard extends Component {
    state = {
        projects: [],
        currentProject: {},
        milestones: [],
        defects: [],
        cycles: [],
        currentCycle: {},
        coverages: [],
        results: [],
        details: null
    };

    async populateProjects() {
        const { data: projects } = await getProjects();
        if (projects.length === 0) return;
        const currentProject = projects[0];

        this.setState({ projects, currentProject });
    }

    async populateCycles(project) {
        if (!project) return;
        const { data: cycles } = await getCyclesByProject(project);
        if (cycles.length === 0) return;
        const currentCycle = cycles[0];

        this.setState({ cycles, currentCycle });
    }

    async populateMilestones(project) {
        if (!project) return;
        const { data: milestones } = await getMilestonesByProject(project);
        this.setState({ milestones });
    }

    async populateResults(cycle) {
        if (!cycle) return;
        const { data: results } = await getResultsByCycle(cycle);
        this.setState({ results });
    }

    async populateCoverages(cycle) {
        if (!cycle) return;
        const { data: coverages } = await getCoveragesByCycle(cycle);
        this.setState({ coverages });
    }

    async populateDefects(project) {
        if (!project) return;
        const { data: defects } = await getDefectsByProject(project);
        this.setState({ defects });
    }

    async componentDidMount() {
        await this.populateProjects();

        // populate project dependent
        await this.populateMilestones(this.state.currentProject);
        await this.populateDefects(this.state.currentProject);
        await this.populateCycles(this.state.currentProject);

        // populate cycle dependent
        await this.populateCoverages(this.state.currentCycle);
        await this.populateResults(this.state.currentCycle);
    }

    // TODO: refactor to use "populate" functions above
    handleProjectSelect = async currentProject => {
        this.setState({
            currentProject,
            milestones: [],
            defects: [],
            cycles: [],
            currentCycle: {},
            coverages: [],
            results: []
        });

        // await this.populateCycles(currentProject);
        const { data: cycles } = await getCyclesByProject(currentProject);
        if (cycles.length === 0) return;
        const currentCycle = cycles[0];
        this.setState({ cycles, currentCycle });

        // populate project dependent
        await this.populateMilestones(currentProject);
        await this.populateDefects(currentProject);

        // populate cycle dependent
        await this.populateCoverages(currentCycle);
        await this.populateResults(currentCycle);
    };

    handleCycleSelect = async currentCycle => {
        this.setState({
            currentCycle
        });

        await this.populateCoverages(currentCycle);
        await this.populateResults(currentCycle);
    };

    handleDetails = domain => {
        const { details } = this.state;
        this.setState({ details: details === domain ? null : domain });
    };

    popoverSingleKpi = (histKpis, dataKey, label, color) => {
        return (
            <Popover id="popover-basic" title={`Historical ${label}`}>
                <KpiTinyLine histKpis={histKpis} kpi={dataKey} color={color} />
            </Popover>
        );
    };

    render() {
        const { projects, currentProject, milestones, defects, cycles, currentCycle, coverages, results } = this.state;

        return (
            <div className="card border-dark">
                <div className="card-header bg-secondary text-white">
                    <TabGroup
                        navClass="nav nav-tabs card-header-tabs"
                        items={projects}
                        selectedItem={currentProject}
                        onItemSelect={this.handleProjectSelect}
                    />
                </div>
                <div className="card-body">
                    <div className="card">
                        <div className="card-header">
                            <PillGroup
                                navClass="nav nav-pills card-header-pills"
                                items={cycles}
                                selectedItem={currentCycle}
                                onItemSelect={this.handleCycleSelect}
                            />
                        </div>
                        <div className="card-body">
                            <CardGroup>
                                <CoverageColumn coverages={coverages} onDetails={this.handleDetails} onKpiPopover={this.popoverSingleKpi} />
                                <ExecutionColumn
                                    results={results}
                                    milestones={milestones}
                                    onDetails={this.handleDetails}
                                    onKpiPopover={this.popoverSingleKpi}
                                />
                                <BugColumn
                                    bugs={defects}
                                    milestones={milestones}
                                    onDetails={this.handleDetails}
                                    onKpiPopover={this.popoverSingleKpi}
                                />
                            </CardGroup>
                            {this.state.details === 'coverage' && <CoverageStackedArea coverages={coverages} />}
                            {this.state.details === 'execution' && <ExecutionStackedArea results={results} milestones={milestones} />}
                            {this.state.details === 'bug' && <DefectStackedArea defects={defects} milestones={milestones} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;