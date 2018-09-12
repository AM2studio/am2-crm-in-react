import React, { Component } from 'react';
import Time from '../../../components/Form/TimePicker';
import Text from '../../../components/Form/Text';
import DatePicker from '../../../components/Form/DatePicker';

import '../../../styles/custom.css';

class AddTime extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    inputChangeEvent = e => {
        console.log(e);
        //  const { name, value } = e.target;
        //        this.setState({ [name]: value });
    };

    render() {
        const { inputs } = this.props;
        return (
            <div className="section col-14 widget">
                <header className="section__header">
                    <h4 className="section__title">Add New Task</h4>
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
                            <button type="button" className="button button--primary button--custom">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTime;

AddTime.defaultProps = {
    inputs: [
        {
            type: Text,
            name: 'title',
            label: 'Project Title',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: DatePicker,
            name: 'date',
            label: 'Date',
            required: true,
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Time,
            name: 'time',
            label: 'Hours of Work',
            required: true,
            value: '01:00',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Time,
            name: 'billable_hours',
            label: 'Billable Hours',
            required: true,
            value: '01:30',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            name: 'project_id',
            label: 'Project',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            propType: 'number',
            name: 'job_type',
            label: 'Job Type',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            name: 'asana_url',
            label: 'Asana URL',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            name: 'comment',
            label: 'Comment',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        }
    ]
};
