import React, { Component } from 'react';
import TimeEntries from './TimeEntries';
import WP_API from '../../data/Api';
import LoadingWidget from '../Dashboard/Widgets/LoadingWidget';

class TimeEntriesContainer extends Component {
    constructor() {
        super();
        this.state = {
            timeEntries: []
        };
    }

    componentWillMount() {
        const api = new WP_API();
        api.getAllPosts('time-entry').then(result => {
            console.log(result);
            const posts = result.map(post => ({
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
            this.setState({ timeEntries: posts });
        });
    }

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
        const { timeEntries } = this.state;

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
                {timeEntries.length > 0 ? (
                    <TimeEntries columns={columns} data={filteredData} />
                ) : (
                    <LoadingWidget className="section" title="User Vacations" />
                )}
            </React.Fragment>
        );
    }
}

export default TimeEntriesContainer;
