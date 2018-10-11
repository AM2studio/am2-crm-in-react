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
            time: '01:00',
            billable_hours: '01:00',
            project: '',
            job_type: 'Dev',
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
        this.setState({ [name]: value, status: false });
        if (name === 'time') {
            this.setState({ billable_hours: value });
        }
    };

    closeNotification = () => {
        this.setState(() => ({ status: false }));
    };

    addUserEntry = () => {
        const { project: projectId, comment } = this.state;
        // Validation
        if (projectId === '' || comment === '') {
            this.setState(() => ({ status: 'error', msgText: 'Required fields are missing.' }));
            return;
        }
        // Proceed
        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        api.setPost('time-entry', '', this.state);
        api.set().then(result => {
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
            time,
            billable_hours, // eslint-disable-line camelcase
            project, // eslint-disable-line camelcase
            job_type, // eslint-disable-line camelcase
            asana_url, // eslint-disable-line camelcase
            comment,
            status,
            loader,
            msgText
        } = this.state;

        const jobType = [
            { value: '2', label: 'Dev' },
            { value: '0', label: 'PM' },
            { value: '1', label: 'Web Design' },
            { value: '13', label: 'Graphic Design' },
            { value: '3', label: 'Personal development' },
            { value: '4', label: 'Administration' },
            { value: '5', label: 'Meeting (client)' },
            { value: '6', label: 'Meeting (internal)' },
            { value: '7', label: 'Team Management' },
            { value: '8', label: 'QA' },
            { value: '9', label: 'Support' },
            { value: '10', label: 'Preparing quote' },
            { value: '11', label: 'Content Transfer' },
            { value: '12', label: 'Junior Training' }
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
                type: DatePicker,
                name: 'date',
                label: 'Date',
                value: date,
                required: true,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Time,
                name: 'time',
                label: 'Hours of Work',
                required: true,
                value: time,
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
