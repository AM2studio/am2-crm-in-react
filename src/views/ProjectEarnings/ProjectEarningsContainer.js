import React, { Component } from 'react';
import ProjectEarnings from './ProjectEarnings';
import WP_API from '../../data/Api';
import { SharedDataConsumer } from '../../data/SharedDataContext';

class ProjectEarningsContainer extends Component {
    constructor() {
        super();
        this.state = {
            projectEarnings: [],
            offset: 0,
            totalRecords: 0,
            loading: true,
            empty: false
        };
    }

    componentWillMount() {
        this.getEarnings();
    }

    getEarnings = (update = false) => {
        const { offset, filterUser, filterProject } = this.state;
        let byPassCache = update;
        let byPassCacheSave = true;
        if (filterUser || filterProject) {
            byPassCache = true;
            byPassCacheSave = false;
        }
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        api.getPosts(
            'project-earnings',
            {
                itemsPerPage,
                offset,
                filterUser,
                filterProject
            },
            byPassCache,
            byPassCacheSave
        ).then(result => {
            this.setState({
                projectEarnings: result.data ? result.data : [],
                totalRecords: result.count.publish,
                loading: false,
                empty: result.data === undefined
            });
        });
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: true }, () => {
            this.getEarnings(true);
        });
    };

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getEarnings();
        });
    };

    status = status => {
        switch (status) {
            case 'approved':
                return <span className="note-type-positive">Approved</span>;
            case 'rejected':
                return <span className="note-type-negative">Rejected</span>;
            case 'declined':
                return <span className="note-type-negative">Rejected</span>;
            default:
                return <span className="note-type-neutral">Pending</span>;
        }
    };

    render() {
        const {
            projectEarnings,
            totalRecords,
            loading,
            filterUser,
            filterProject,
            empty
        } = this.state;

        const { itemsPerPage } = this.props;
        const filteredData = projectEarnings.map((user, index) => ({
            ...user,
            status: this.status(user.status)
        }));
        const columns = [
            { key: 'title', title: 'Milestone' },
            { key: 'project_title', title: 'Project' },
            //    { key: 'date', title: 'Date' },
            { key: 'pm', title: 'PM' },
            // { key: 'currency', title: 'Currency' },
            { key: 'quoted_hours', title: 'Quoted Hours' },
            { key: 'hourly_rate', title: 'Hourly Rate' },
            { key: 'prihod', title: 'Income' },
            { key: 'spent_hours', title: 'Spent Hours' },
            { key: 'project_cost', title: 'Project Cost' },
            { key: 'completion_rate', title: 'Completion %' },
            { key: 'procjenjeno_sati', title: 'Estimate Hours' },
            { key: 'prosjecna_satnica', title: 'Avg. Hourly rate' },
            { key: 'inicijalna_procjena_troska', title: 'Initial Total Cost' },
            { key: 'procjenjeni_trosak', title: 'Current Cost' },
            { key: 'procjenjena_zarada', title: 'Estimate Earnings' },
            { key: 'marza', title: 'Margin' }
        ];
        return (
            <SharedDataConsumer>
                {({ users, projects }) => (
                    <ProjectEarnings
                        columns={columns}
                        data={filteredData}
                        empty={empty}
                        addUser={this.addUser}
                        onPageChanged={this.onPageChanged}
                        totalRecords={totalRecords}
                        loading={loading}
                        itemsPerPage={itemsPerPage}
                        projectsList={projects}
                        usersList={users}
                        filterChangeEvent={this.filterChangeEvent}
                        filterProject={filterProject}
                        filterUser={filterUser}
                    />
                )}
            </SharedDataConsumer>
        );
    }
}

export default ProjectEarningsContainer;

ProjectEarningsContainer.defaultProps = {
    itemsPerPage: 20
};
