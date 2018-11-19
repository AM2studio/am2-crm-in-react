import React, { Component } from 'react';
import ProjectEarnings from './ProjectEarnings';
import WP_API from '../../data/Api';

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

    getEarnings = () => {
        const { offset, filterUser, filterProject } = this.state;
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        api.getPosts('project-earnings', {
            itemsPerPage,
            offset,
            filterUser,
            filterProject
        }).then(result => {
            if (!result.data) {
                this.setState({ empty: true });
                return;
            }
            this.setState({
                projectEarnings: result.data,
                totalRecords: result.count.publish,
                loading: false,
                empty: false
            });
        });
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: true }, () => {
            this.getEarnings();
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
        const projectsList = JSON.parse(localStorage.getItem('projects'));
        const usersList = JSON.parse(localStorage.getItem('users'));
        const {
            projectEarnings,
            totalRecords,
            loading,
            filterUser,
            filterProject,
            empty
        } = this.state;
        const { itemsPerPage } = this.props;
        const filteredUsersList = usersList.filter(user => user.company_role === 'pm');

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
            <ProjectEarnings
                columns={columns}
                data={filteredData}
                empty={empty}
                addUser={this.addUser}
                onPageChanged={this.onPageChanged}
                totalRecords={totalRecords}
                loading={loading}
                itemsPerPage={itemsPerPage}
                projectsList={projectsList}
                usersList={filteredUsersList}
                filterChangeEvent={this.filterChangeEvent}
                filterProject={filterProject}
                filterUser={filterUser}
            />
        );
    }
}

export default ProjectEarningsContainer;

ProjectEarningsContainer.defaultProps = {
    itemsPerPage: 20
};
