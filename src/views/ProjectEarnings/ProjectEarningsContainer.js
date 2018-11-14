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
            loading: true
        };
    }

    componentWillMount() {
        this.getEarnings();
    }

    getEarnings = () => {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        api.getPosts('project-earnings', { itemsPerPage, offset }).then(result => {
            console.log(result);
            this.setState({
                projectEarnings: result.data,
                totalRecords: result.count.publish,
                loading: false
            });
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
        console.log(this.state);
        const { projectEarnings, totalRecords, loading } = this.state;
        const { itemsPerPage } = this.props;
        const filteredData = projectEarnings.map((user, index) => ({
            ...user,
            status: this.status(user.status)
        }));
        const columns = [
            { key: 'title', title: 'Milestone' },
            { key: 'project_title', title: 'Project' },
            //    { key: 'date', title: 'Date' },
            // { key: 'pm', title: 'PM' },
            // { key: 'currency', title: 'Currency' },
            { key: 'completion_rate', title: 'Completion %' },
            { key: 'hourly_rate', title: 'Hourly Rate' },
            { key: 'inicijalna_procjena_troska', title: 'Initial Total Cost' },
            { key: 'prihod', title: 'Income' },
            { key: 'procjenjena_zarada', title: 'Estimate Earnings' },
            { key: 'procjenjeni_trosak', title: 'Estimate Cost' },
            { key: 'procjenjeno_sati', title: 'Estimate Hours' },
            { key: 'project_cost', title: 'Project Cost' },
            { key: 'prosjecna_satnica', title: 'Avg. Hourly rate' },
            { key: 'quoted_hours', title: 'Quoted Hours' },
            { key: 'spent_hours', title: 'Spent Hours' },
            { key: 'marza', title: 'Margin' }
        ];
        return (
            <ProjectEarnings
                columns={columns}
                data={filteredData}
                addUser={this.addUser}
                onPageChanged={this.onPageChanged}
                totalRecords={totalRecords}
                loading={loading}
                itemsPerPage={itemsPerPage}
            />
        );
    }
}

export default ProjectEarningsContainer;

ProjectEarningsContainer.defaultProps = {
    itemsPerPage: 20
};
