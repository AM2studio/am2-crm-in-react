import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt, FaSafari } from 'react-icons/fa';
import TimeEntriesEdit from './TimeEntriesEdit';
import TimeEntries from './TimeEntries';
import WP_API from '../../data/Api';
import AM2Modal from '../../components/General/AM2Modal';

class TimeEntriesContainer extends Component {
    constructor() {
        super();
        this.state = {
            timeEntries: [],
            offset: 0,
            totalRecords: 0,
            modal: false,
            isAdmin: false,
            loading: true,
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

    getEntries = () => {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        api.getPosts('time-entry', { itemsPerPage, offset }).then(result => {
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
            const obj = {};
            // Need to save as state to manipulate with checkbox
            const isBillable = posts.reduce((prev, curr) => {
                obj[curr.id] = curr.is_billable;
                return obj;
            });
            this.setState({
                isBillable,
                timeEntries: posts,
                totalRecords: result.count,
                loading: false,
                isAdmin: !!result.data[0].is_billable
            });
        });
    };

    editTimeEntry = (e, id) => {
        console.log(`Editing time entry with id: ${id}`);
        const { dataToFetch } = this.props;
        const data = new WP_API();
        data.get('time-entry', id, dataToFetch).then(result => {
            this.setState(() => ({
                modal: true,
                singleTimeEntryData: result
            }));
        });
    };

    handleIsBillable = (e, id) => {
        const { checked } = e.target;
        const value = checked === true ? '1' : '0';
        const data = new WP_API();
        this.setState({ checkboxUpdating: id });
        data.setPost('time-entry', id, { just_billable: value });
        data.set().then(result => {
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
                className="button--table button--table--edit"
                onClick={e => {
                    this.editTimeEntry(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button--table button--table--delete"
                onClick={e => {
                    this.deleteTimeEntry(e, id);
                }}
            >
                <FaTrashAlt />
            </button>
        </React.Fragment>
    );

    handleModalClose = update => {
        this.setState({ modal: false });
        if (update === true) {
            this.getEntries();
        }
    };

    hours = (hour, billable_hours) => <p data-tip={`billable: ${billable_hours}`}>{hour}</p>; // eslint-disable-line camelcase

    date = (date, month) => <p data-tip={month}>{date}</p>;

    comment = comment => (
        <p data-tip={comment}>
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
            singleTimeEntryData,
            modal,
            isAdmin
        } = this.state;
        const { itemsPerPage } = this.props;
        const filteredData = timeEntries.map(entry => ({
            ...entry,
            hours: this.hours(entry.hours, entry.billable_hours),
            date: this.date(entry.date, entry.month),
            comment: this.comment(entry.comment),
            asana_url: entry.asana_url && this.asana(entry.asana_url),
            buttons: this.actionBtns(entry.id),
            is_billable: this.isBillable(entry.id)
        }));
        const columns = [
            // { key: 'billable_hours', title: 'Billable Hours' },
            { key: 'hours', title: 'Hours' },
            // { key: 'month', title: 'Month' },
            { key: 'date', title: 'Date' },
            { key: 'project', title: 'Project' },
            // { key: 'project_feature', title: 'Feature' },
            { key: 'job_type', title: 'Job Type' },
            { key: 'comment', title: 'Comment' },
            { key: 'asana_url', title: 'Asana URL' },
            { key: 'buttons', title: 'Action' }
        ];
        if (isAdmin) {
            columns.unshift(
                { key: 'is_billable', title: 'Is billable' },
                { key: 'user', title: 'User' }
            );
        }
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
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <TimeEntriesEdit
                        singleTimeEntryData={singleTimeEntryData}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
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
        'comment',
        'company',
        'date',
        'hours',
        'id',
        'is_billable',
        'job_type',
        'project',
        'project_feature',
        'asana_url'
    ]
};
export default TimeEntriesContainer;
