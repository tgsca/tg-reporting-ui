import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getProjects, deleteProject } from '../services/projectService';
import ProjectTable from './projectTable';
import { paginate } from '../utils/paginate';
import SearchBox from './common/searchBox';
import Pagination from './common/pagination';
import PageSize from './common/pageSize';

class Projects extends Component {
    state = {
        projects: [],
        sortColumn: { path: 'name', order: 'asc' },
        pageSizes: [3, 5, 10, 20, 50],
        pageSize: 10,
        currentPage: 1,
        searchQuery: ''
    };

    async componentDidMount() {
        const { data: projects } = await getProjects();
        this.setState({ projects });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handlePageSizeChange = pageSize => {
        this.setState({ pageSize, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleSearch = query => {
        this.setState({
            searchQuery: query,
            currentPage: 1
        });
    };

    getPageData = () => {
        const { projects: allProjects, currentPage, pageSize, sortColumn, searchQuery } = this.state;

        let filtered = allProjects;
        if (searchQuery) filtered = allProjects.filter(m => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const projects = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: projects };
    };

    handleNew = () => {
        this.props.history.push('/projects/new');
    };

    handleDelete = async id => {
        try {
            await deleteProject(id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) toast.error('This movie has already been deleted.');
        }
        const { data: projects } = await getProjects();
        this.setState({ projects });
    };

    render() {
        const { searchQuery, sortColumn, pageSizes, pageSize, currentPage } = this.state;
        const { length: count } = this.state.projects;
        if (count === 0)
            return (
                <React.Fragment>
                    <div>There are no projects in the database.</div>
                </React.Fragment>
            );

        const { totalCount, data: projects } = this.getPageData();

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <button onClick={this.handleNew} className="btn btn-primary margin-bottom">
                            New Project
                        </button>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ProjectTable
                            projects={projects}
                            sortColumn={sortColumn}
                            count={totalCount}
                            itemsLabel="projects"
                            onSort={this.handleSort}
                            onDelete={this.handleDelete}
                        />
                    </div>
                </div>

                <div className="card border-light mb-12">
                    <div className="card-footer">
                        <div className="row">
                            <div className="col">
                                <Pagination
                                    itemCount={totalCount}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange}
                                />
                            </div>
                            <div className="col text-right">
                                <PageSize pageSizes={pageSizes} currentPageSize={pageSize} onPageSizeChange={this.handlePageSizeChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Projects;
