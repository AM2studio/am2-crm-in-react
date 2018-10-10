import React, { Component } from 'react';
import moment from 'moment';
import WP_API from '../../data/Api';
import Time from '../../components/Form/TimePicker';
import Text from '../../components/Form/Text';
import Radio from '../../components/Form/Radio';
import Select from '../../components/Form/Select';
import Textarea from '../../components/Form/Textarea';
import DatePicker from '../../components/Form/DatePicker';

class TimeEntriesEdit extends Component {
    constructor(props) {
        super(props);
        const obj = {};
        // Loop through props object and set as states
        const result = Object.keys(props.singleTimeEntryData).reduce((prev, curr) => {
            if (curr === 'date') {
                obj[curr] = moment(props.singleTimeEntryData[curr]).format('DD/MM/YYYY'); // eslint-disable-line no-param-reassign
            } else {
                obj[curr] = props.singleTimeEntryData[curr]; // eslint-disable-line no-param-reassign
            }

            return obj;
        }, {});
        this.state = result;
    }

    updateEntryData = () => {
        const { id } = this.state; // eslint-disable-line camelcase
        const { handleModalClose } = this.props;
        const data = new WP_API();

        data.setPost('time-entry', id, this.state);
        data.set().then(result => {
            if (result.success === true) {
                handleModalClose(true);
            } else {
                console.log('Something went wrong!');
            }
        });
    };

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            date,
            hours,
            billable_hours, // eslint-disable-line camelcase
            project, // eslint-disable-line camelcase
            job_type, // eslint-disable-line camelcase
            asana_url, // eslint-disable-line camelcase
            is_billable, // eslint-disable-line camelcase
            comment
        } = this.state;

        const { projects, handleModalClose, isBillable } = this.props;

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

        const fields = [
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
            },
            {
                type: Radio,
                name: 'is_billable',
                label: 'Track Resources',
                required: true,
                value: is_billable,
                list: isBillable,
                parentClass: 'form__column col-12',
                className: 'form__input'
            }
        ];
        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit Project</h2>
                </header>
                <div className="section__content">
                    <form className="form">
                        <div className="form__row">
                            {fields.map(field => (
                                <field.type
                                    label={field.label}
                                    name={field.name}
                                    parentClass={field.parentClass}
                                    email={field.email}
                                    propType={field.propType}
                                    required={field.required}
                                    value={field.value}
                                    list={field.list}
                                    className="form__input"
                                    inputChangeEvent={this.inputChangeEvent}
                                />
                            ))}
                        </div>
                        <div className="form__row">
                            <button
                                type="button"
                                className="button button--primary"
                                onClick={this.updateEntryData}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="button right"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TimeEntriesEdit;

TimeEntriesEdit.defaultProps = {
    isBillable: [{ id: 1, title: 'Yes' }, { id: 0, title: 'No' }],
    projects: JSON.parse(localStorage.getItem('projects'))
};
