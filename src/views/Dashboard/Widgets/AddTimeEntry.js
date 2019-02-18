import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import lscache from 'lscache';
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
            feature: '',
            features: [],
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
                console.log(response);
                if (response.milestones.length || response.features.length) {
                    this.setState({
                        [name]: value,
                        status: false,
                        milestones: response.milestones,
                        features: response.features,
                        milestone: '',
                        feature: ''
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
        const { project: projectId, comment, milestone, feature, features } = this.state;

        // Validation
        if (projectId === '' || comment === '' || milestone === '' || (feature === '' && features.length > 0)) {
            this.setState(() => ({ status: 'is-danger', msgText: 'Required fields are missing.' }));
            return;
        }
        // Proceed
        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        api.set('time-entry', '', this.state).then(result => {
            if (result.success === true) {
                this.setState(this.initialState);
                this.setState(() => ({ status: 'is-success', msgText: 'Entry Added!' }));
                lscache.flush();
            } else {
                this.setState(() => ({
                    status: 'is-danger',
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
            milestones,
            features,
            feature
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
                value: project
            },
            {
                type: Select,
                name: 'milestone',
                label: 'Milestone',
                placeholder: 'Select Milestone',
                list: milestones,
                required: true,
                value: milestone
            },
            {
                type: Select,
                name: 'feature',
                label: 'Feature',
                placeholder: 'Select Feature',
                list: features,
                required: true,
                value: feature
            },
            {
                type: DatePicker,
                name: 'date',
                label: 'Date',
                value: date,
                required: true
            },
            {
                type: Time,
                name: 'hours',
                label: 'Hours of Work',
                required: true,
                value: hours
            },
            {
                type: Time,
                name: 'billable_hours',
                label: 'Billable Hours',
                required: true,
                value: billable_hours
            },
            {
                type: Select,
                name: 'job_type',
                label: 'Job Type',
                placeholder: 'Select Work Type',
                required: true,
                value: job_type,
                list: jobType
            },
            {
                type: Text,
                name: 'asana_url',
                label: 'Asana URL',
                value: asana_url
            },
            {
                type: Textarea,
                name: 'comment',
                label: 'Comment',
                rows: '4',
                required: true,
                value: comment
            }
        ];

        if (loader === true) {
            return <LoadingWidget className="column widget" title="Add New Time Entry" />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="column widget"
                transitionAppear
                transitionName="loadComponent"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
                <header className="widget__header">
                    <h4 className="widget__title">Add New Time Entry</h4>
                </header>
                <div className="widget__content has-background-white">
                    <div className="widget">
                        <form className="form">
                            {status ? <Notification text={msgText} type={status} close={this.closeNotification} /> : ''}

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
                                    placeholder={field.placeholder}
                                    inputChangeEvent={this.inputChangeEvent}
                                />
                            ))}
                            <div className="field">
                                <button
                                    type="button"
                                    className="button is-primary is-fullwidth"
                                    onClick={this.addUserEntry}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

export default AddTime;
