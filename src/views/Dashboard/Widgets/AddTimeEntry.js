import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Time from '../../../components/Form/TimePicker';
import Text from '../../../components/Form/Text';
import Select from '../../../components/Form/Select';
import Textarea from '../../../components/Form/Textarea';
import DatePicker from '../../../components/Form/DatePicker';

class AddTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            date: '',
            time: '',
            billable_hours: '',
            project_id: '',
            job_type: '',
            asana_url: '',
            comment: ''
            //     status: false
        };
    }

    inputChangeEvent = e => {
        console.log(e);
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    closeNotification = () => {
        this.setState(() => ({ status: false }));
    };

    render() {
        const { projects } = this.props;
        const {
            title,
            date,
            time,
            billable_hours, // eslint-disable-line camelcase
            project_id, // eslint-disable-line camelcase
            job_type, // eslint-disable-line camelcase
            asana_url, // eslint-disable-line camelcase
            comment
        } = this.state;
        const inputs = [
            {
                type: Text,
                name: 'title',
                label: 'Project Title',
                required: true,
                value: title,
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
                name: 'project_id',
                label: 'Project',
                placeholder: 'Select Project',
                list: projects,
                required: true,
                value: project_id,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Text,
                propType: 'number',
                name: 'job_type',
                label: 'Job Type',
                required: true,
                value: job_type,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Text,
                name: 'asana_url',
                label: 'Asana URL',
                required: true,
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
                            <button type="button" className="button button--primary button--custom">
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
