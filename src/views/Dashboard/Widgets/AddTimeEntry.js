import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import WP_API from '../../../data/Api';
import Time from '../../../components/Form/TimePicker';
import Text from '../../../components/Form/Text';
import Select from '../../../components/Form/Select';
import Textarea from '../../../components/Form/Textarea';
import DatePicker from '../../../components/Form/DatePicker';
import Notification from '../../../components/Form/Notification';
import LoadingWidget from './LoadingWidget';

class AddTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment().format('DD/MM/YYYY'),
            hours: '01:00',
            billable_hours: '01:00',
            project: '',
            milestone: '',
            milestones: [],
            job_type: '2',
            is_billable: 1,
            asana_url: '',
            comment: '',
            msgText: '',
            status: false,
            loader: false
        };
    }

    componentWillMount() {
        this.initialState = this.state;
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        if (name === 'hours') {
            this.setState({ [name]: value, status: false, billable_hours: value });
        } else if (name === 'project') {
            const api = new WP_API();
            api.getPosts('milestones', { id: value }, true, false).then(response => {
                if (response.length) {
                    this.setState({
                        [name]: value,
                        status: false,
                        milestones: response,
                        milestone: ''
                    });
                }
            });
        } else {
            this.setState({ [name]: value, status: false });
        }
    };

    closeNotification = () => {
        this.setState(() => ({ status: false }));
    };

    addUserEntry = () => {
        const { project: projectId, comment, milestone } = this.state;
        // Validation
        if (projectId === '' || comment === '' || milestone === '') {
            this.setState(() => ({ status: 'error', msgText: 'Required fields are missing.' }));
            return;
        }
        // Proceed
        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        api.set('time-entry', '', this.state).then(result => {
            if (result.success === true) {
                this.setState(this.initialState);
                this.setState(() => ({ status: 'success', msgText: 'Entry Added!' }));
            } else {
                this.setState(() => ({
                    status: 'error',
                    msgText: 'Upss.. something went wrong! Check with Goran.',
                    loader: false
                }));
                console.log('Something went wrong!');
            }
        });
    };

    render() {
        const { projects } = this.props;
        const {
            date,
            hours,
            billable_hours, // eslint-disable-line camelcase
            project, // eslint-disable-line camelcase
            job_type, // eslint-disable-line camelcase
            asana_url, // eslint-disable-line camelcase
            comment,
            status,
            loader,
            msgText,
            milestone,
            milestones
        } = this.state;

        const jobType = [
            { id: '2', title: 'Dev' },
            { id: '0', title: 'PM' },
            { id: '1', title: 'Web Design' },
            { id: '13', title: 'Graphic Design' },
            { id: '3', title: 'Personal development' },
            { id: '4', title: 'Administration' },
            { id: '5', title: 'Meeting (client)' },
            { id: '6', title: 'Meeting (internal)' },
            { id: '7', title: 'Team Management' },
            { id: '8', title: 'QA' },
            { id: '9', title: 'Support' },
            { id: '10', title: 'Preparing quote' },
            { id: '11', title: 'Content Transfer' },
            { id: '12', title: 'Junior Training' }
        ];

        const inputs = [
            {
                type: Select,
                name: 'project',
                label: 'Project',
                placeholder: 'Select Project',
                list: projects,
                required: true,
                value: project,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Select,
                name: 'milestone',
                label: 'Milestone',
                placeholder: 'Select Milestone',
                list: milestones,
                required: true,
                value: milestone,
                parentClass: 'column twelve'
            },
            {
                type: DatePicker,
                name: 'date',
                label: 'Date',
                value: date,
                required: true,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Time,
                name: 'hours',
                label: 'Hours of Work',
                required: true,
                value: hours,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Time,
                name: 'billable_hours',
                label: 'Billable Hours',
                required: true,
                value: billable_hours,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Select,
                name: 'job_type',
                label: 'Job Type',
                placeholder: 'Select Work Type',
                required: true,
                value: job_type,
                list: jobType,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Text,
                name: 'asana_url',
                label: 'Asana URL',
                value: asana_url,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Textarea,
                name: 'comment',
                label: 'Comment',
                rows: '4',
                required: true,
                value: comment,
                parentClass: 'form__column col-1 form__row'
            }
        ];

        if (loader === true) {
            return <LoadingWidget className="section col-14 widget" title="Add New Time Entry" />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="section col-14 widget widget"
                transitionAppear
                transitionName="loadComponent"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
                <header className="section__header">
                    <h4 className="section__title">Add New Time Entry</h4>
                </header>
                <div className="section__content">
                    <div className="widget">
                        <form className="form">
                            {status ? (
                                <Notification
                                    text={msgText}
                                    type={status}
                                    close={this.closeNotification}
                                />
                            ) : (
                                ''
                            )}
                            <div className="form__row">
                                {inputs.map(field => (
                                    <field.type
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        parentClass={field.parentClass}
                                        required={field.required}
                                        value={field.value}
                                        list={field.list}
                                        rows={field.rows}
                                        className="form__input"
                                        placeholder={field.placeholder}
                                        inputChangeEvent={this.inputChangeEvent}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="button button--primary button--custom"
                                onClick={this.addUserEntry}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

export default AddTime;
