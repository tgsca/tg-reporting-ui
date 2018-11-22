import React, { Component } from 'react';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import { getCycles, getCyclesByProjectId } from '../services/cycleService';
import CycleTable from './cycleTable';
import SearchBox from './common/searchBox';
import Pagination from './common/pagination';
import PageSize from './common/pageSize';

class Cycles extends Component {
    state = {
        cycles: [],
        sortColumn: { path: 'name', order: 'asc' },
        pageSizes: [3, 5, 10, 20, 50],
        pageSize: 10,
        currentPage: 1,
        searchQuery: ''
    };

    async componentDidMount() {
        if (!this.props.projectId) {
            const { data: cycles } = await getCycles();
            this.setState({ cycles });
        } else {
            const { data: cycles } = await getCyclesByProjectId(this.props.projectId);
            this.setState({ cycles });
        }
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
        const { cycles: allCycles, currentPage, pageSize, sortColumn, searchQuery } = this.state;

        let filtered = allCycles;
        if (searchQuery) filtered = allCycles.filter(m => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const cycles = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: cycles };
    };

    render() {
        const { searchQuery, sortColumn, pageSizes, pageSize, currentPage } = this.state;
        const { length: count } = this.state.cycles;
        if (count === 0)
            return (
                <React.Fragment>
                    <button onClick={this.props.onNewCyle} className="btn btn-primary margin-bottom">
                        New Cycle
                    </button>
                    <div>There are no cycles in the database.</div>
                </React.Fragment>
            );

        const { totalCount, data: cycles } = this.getPageData();

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <button onClick={this.props.onNewCyle} className="btn btn-primary margin-bottom">
                            New Cycle
                        </button>

                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CycleTable
                            cycles={cycles}
                            sortColumn={sortColumn}
                            count={totalCount}
                            itemsLabel="cycles"
                            onSort={this.handleSort}
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
                                <PageSize
                                    pageSizes={pageSizes}
                                    currentPageSize={pageSize}
                                    onPageSizeChange={this.handlePageSizeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Cycles;
