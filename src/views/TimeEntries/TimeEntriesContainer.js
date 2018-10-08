import React, { Component } from 'react';
import TimeEntries from './TimeEntries';
import WP_API from '../../data/Api';

class TimeEntriesContainer extends Component {
    constructor() {
        super();
        this.state = {
            timeEntries: [],
            offset: 0,
            totalRecords: 0,
            loading: true
        };
    }

    componentWillMount() {
        this.getEntries();
    }

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        console.log(itemsPerPage);
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getEntries();
        });
    };

    getEntries = () => {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        console.log(itemsPerPage);
        api.getPosts('time-entry', { itemsPerPage, offset }).then(result => {
            console.log(result);
            const posts = result.data.map(post => ({
                id: post.id,
                is_billable: post.is_billable,
                billable_hours: post.billable_hours,
                month: post.month,
                user: post.user,
                project: post.project,
                project_feature: post.project_feature,
                date: post.date,
                hours: post.hours,
                job_type: post.job_type,
                comment: post.comment,
                asana_url: post.asana_url
            }));
            this.setState({
                timeEntries: posts,
                totalRecords: result.count,
                loading: false
            });
        });
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button button--primary button--small button--bold"
                onClick={e => {
                    this.editUser(e, id);
                }}
            >
                Edit
            </button>
            <button
                type="button"
                className="button button--danger button--small button--bold"
                onClick={e => {
                    this.deleteUser(e, id);
                }}
            >
                Delete
            </button>
        </React.Fragment>
    );

    approve = () => {
        console.log('radi');
    };

    render() {
        const { timeEntries, totalRecords, loading } = this.state;
        const { itemsPerPage } = this.props;
        const filteredData = timeEntries.map(entry => ({
            ...entry,
            buttons: this.actionBtns(entry.id)
        }));
        const columns = [
            { key: 'is_billable', title: 'Is billable' },
            { key: 'billable_hours', title: 'Billable Hours' },
            { key: 'hours', title: 'Hours' },
            { key: 'month', title: 'Month' },
            { key: 'date', title: 'Date' },
            { key: 'user', title: 'User' },
            { key: 'project', title: 'Project' },
            //            { key: 'project_feature', title: 'Feature' },
            { key: 'job_type', title: 'Job Type' },
            { key: 'comment', title: 'Comment' },
            { key: 'asana_url', title: 'Asana URL' },
            { key: 'buttons', title: 'Action' }
        ];
        return (
            <React.Fragment>
                <TimeEntries
                    columns={columns}
                    data={filteredData}
                    onPageChanged={this.onPageChanged}
                    totalRecords={totalRecords}
                    loading={loading}
                    itemsPerPage={itemsPerPage}
                />
            </React.Fragment>
        );
    }
}

TimeEntriesContainer.defaultProps = {
    itemsPerPage: 20
};

export default TimeEntriesContainer;
