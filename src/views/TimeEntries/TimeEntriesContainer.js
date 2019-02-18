import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt, FaSafari } from 'react-icons/fa';
import TimeEntriesEdit from './TimeEntriesEdit';
import TimeEntries from './TimeEntries';
import WP_API from '../../data/Api';
import AM2Modal from '../../components/General/AM2Modal';
import Select from '../../components/Form/Select';

class TimeEntriesContainer extends Component {
    constructor() {
        super();
        this.state = {
            timeEntries: [],
            projectsList: [],
            usersList: [],
            offset: 0,
            totalRecords: 0,
            modal: false,
            isAdmin: false,
            loading: true,
            filterProject: '',
            filterUser: '',
            filterDate: '',
            empty: false,
            checkboxUpdating: false
        };
    }

    componentWillMount() {
        this.getEntries();
    }

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getEntries();
        });
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: true }, () => {
            this.getEntries(true);
        });
    };

    milestoneChange = e => {
        const api = new WP_API();
        api.set('time-entry', e.target.name, {
            singleUpdate: true,
            just_milestone: e.target.value
        }).then(result => {
            if (!result.success === true) {
                console.log('Something went wrong!');
            }
        });
    };

    getEntries = (update = false) => {
        this.setState({ loading: true, empty: false });
        const { offset, filterUser, filterProject, filterDate } = this.state;
        let byPassCache = update;
        let byPassCacheSave = true;

        if (filterUser || filterProject || filterDate) {
            byPassCache = true;
            byPassCacheSave = false;
        }
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        const usersList = api.getPosts('users').then(result => result.data);
        const projectsList = api.getPosts('projects').then(result => result.data);
        const timeEntries = api
            .getPosts(
                'time-entry',
                {
                    itemsPerPage,
                    offset,
                    filterUser,
                    filterProject,
                    filterDate
                },
                byPassCache,
                byPassCacheSave
            )
            .then(result => {
                const posts =
                    result.data &&
                    result.data.map(post => ({
                        id: post.id,
                        is_billable: post.is_billable,
                        billable_hours: post.billable_hours,
                        month: post.month,
                        user: post.user,
                        project: post.project,
                        milestones: post.milestones,
                        milestone: post.milestone,
                        features: post.features,
                        feature: post.feature,
                        date: post.date,
                        hours: post.hours,
                        job_type: post.job_type,
                        comment: post.comment,
                        asana_url: post.asana_url
                    }));
                if (!posts) {
                    return { timeEntries: [] };
                }
                const obj = {};
                // Need to save as state to manipulate with checkbox
                const isBillable = posts.reduce((prev, curr) => {
                    obj[curr.id] = curr.is_billable;
                    return obj;
                });
                return { isBillable, timeEntries: posts, totalRecords: result.count };
            });
        Promise.all([usersList, timeEntries, projectsList]).then(result => {
            if (result[1].timeEntries.length) {
                this.setState({
                    usersList: result[0],
                    projectsList: result[2],
                    isBillable: result[1].isBillable,
                    timeEntries: result[1].timeEntries,
                    totalRecords: result[1].totalRecords,
                    loading: false,
                    isAdmin: !!result[1].timeEntries[0].user,
                    empty: result[1].totalRecords === 0
                });
            } else {
                this.setState({
                    usersList: result[0],
                    projectsList: result[2],
                    loading: false,
                    empty: true
                });
            }
        });
    };

    editTimeEntry = (e, id) => {
        this.setState({ modal: true });
        const { dataToFetch } = this.props;
        const data = new WP_API();
        data.get('time-entry', id, dataToFetch).then(result => {
            this.setState({ singleTimeEntryData: result });
        });
    };

    deleteTimeEntry = (e, id) => {
        const data = new WP_API();
        data.delete('time-entry', id).then(result => {
            // Instead of another API call, remove from array?
            this.getEntries(true);
        });
    };

    handleIsBillable = (e, id) => {
        const { checked } = e.target;
        const value = checked === true ? '1' : '0';
        const data = new WP_API();
        this.setState({ checkboxUpdating: id });
        data.set('time-entry', id, { just_billable: value }).then(result => {
            if (result.success === true) {
                this.setState(prevState => {
                    const { isBillable } = prevState;
                    return {
                        isBillable: {
                            ...isBillable,
                            [id]: value
                        },
                        checkboxUpdating: false
                    };
                });
            } else {
                console.log('Something went wrong!');
            }
        });
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button is-primary"
                onClick={e => {
                    this.editTimeEntry(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button is-danger"
                onClick={e => {
                    this.deleteTimeEntry(e, id);
                }}
            >
                <FaTrashAlt />
            </button>
        </React.Fragment>
    );

    milestonesSelect = (id, milestones, milestone) => (
        <Select name={id} value={milestone} list={milestones} inputChangeEvent={this.milestoneChange} />
    );

    handleModalClose = update => {
        this.setState({ modal: false });
        if (update === true) {
            this.getEntries(true);
        }
    };

    hours = (hour, billable_hours) => <p data-tip={`billable: ${billable_hours}`}>{hour}</p>; // eslint-disable-line camelcase

    date = (date, month) => <p data-tip={month}>{date}</p>;

    filterJobType = jobType => {
        const jobTypeClass = jobType.replace(/[^a-zA-Z]+/g, '');
        return <span className={`tag ${jobTypeClass}`}>{jobType}</span>;
    };

    comment = comment => (
        <p className="entryComment" data-tip={comment}>
            {comment.substring(0, 21)}
            {comment.length > 21 ? '...' : ''}
        </p>
    );

    isBillable = id => {
        const { isBillable, checkboxUpdating } = this.state;
        if (checkboxUpdating === id) {
            return 'saving...';
        }
        return (
            <input
                type="checkbox"
                checked={isBillable[id] && isBillable[id] !== '0'}
                onChange={e => {
                    this.handleIsBillable(e, id);
                }}
            />
        );
    };

    asana = asana => (
        <a href={asana} rel="noopener noreferrer" target="_blank" data-tip={asana}>
            <FaSafari />
        </a>
    );

    render() {
        const {
            timeEntries,
            totalRecords,
            loading,
            empty,
            singleTimeEntryData,
            modal,
            isAdmin,
            filterProject,
            filterUser,
            usersList,
            projectsList
        } = this.state;

        const { itemsPerPage } = this.props;

        const filteredData = timeEntries.map(entry => ({
            ...entry,
            job_type: this.filterJobType(entry.job_type),
            hours: this.hours(entry.hours, entry.billable_hours),
            date: this.date(entry.date, entry.month),
            comment: entry.comment ? this.comment(entry.comment) : '',
            asana_url: entry.asana_url && this.asana(entry.asana_url),
            buttons: this.actionBtns(entry.id),
            milestone: this.milestonesSelect(entry.id, entry.milestones, entry.milestone),
            is_billable: this.isBillable(entry.id)
        }));
        const columns = [
            { key: 'is_billable', title: 'Is Billable' },
            // { key: 'billable_hours', title: 'Billable Hours' },
            { key: 'hours', title: 'Hours' },
            // { key: 'month', title: 'Month' },
            { key: 'date', title: 'Date' },
            { key: 'project', title: 'Project' },
            { key: 'milestone', title: 'Milestone' },
            { key: 'feature', title: 'Feature' },
            { key: 'job_type', title: 'Job Type' },
            { key: 'comment', title: 'Comment' },
            { key: 'asana_url', title: 'Asana URL' },
            { key: 'buttons', title: 'Action' }
        ];
        if (isAdmin) {
            columns.unshift({ key: 'user', title: 'User' });
        }

        return (
            <React.Fragment>
                <TimeEntries
                    columns={columns}
                    data={filteredData}
                    onPageChanged={this.onPageChanged}
                    totalRecords={totalRecords}
                    loading={loading}
                    empty={empty}
                    itemsPerPage={itemsPerPage}
                    projectsList={projectsList}
                    usersList={usersList}
                    filterChangeEvent={this.filterChangeEvent}
                    filterProject={filterProject}
                    filterUser={filterUser}
                    isAdmin={isAdmin}
                />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <TimeEntriesEdit
                        singleTimeEntryData={singleTimeEntryData}
                        handleModalClose={this.handleModalClose}
                        projects={projectsList}
                        users={usersList}
                    />
                </AM2Modal>
            </React.Fragment>
        );
    }
}

TimeEntriesContainer.defaultProps = {
    itemsPerPage: 20,
    dataToFetch: [
        'billable_hours',
        'user_id',
        'milestones',
        'milestone',
        'features',
        'feature',
        'comment',
        'company',
        'date',
        'hours',
        'id',
        'is_billable',
        'job_type',
        'project',
        'asana_url'
    ]
};
export default TimeEntriesContainer;
