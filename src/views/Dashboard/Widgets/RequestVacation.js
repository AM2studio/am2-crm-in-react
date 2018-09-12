import React, { Component } from 'react';
import Text from '../../../components/Form/Text';
import DatePicker from '../../../components/Form/DatePicker';

import '../../../styles/custom.css';

class RequestVacation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            endDate: '',
            days: ''
        };
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { startDate, endDate, days } = this.state;

        const inputs = [
            {
                type: DatePicker,
                name: 'startDate',
                label: 'Start Date',
                required: true,
                value: startDate,
                parentClass: 'form__row'
            },
            {
                type: DatePicker,
                name: 'endDate',
                label: 'End Date',
                required: true,
                value: endDate,
                parentClass: 'form__row'
            },
            {
                type: Text,
                name: 'days',
                label: 'Working Days',
                propType: 'number',
                required: true,
                value: days,
                parentClass: 'form__row'
            }
        ];

        return (
            <div className="section col-14 widget widget--vacation">
                <header className="section__header">
                    <h4 className="section__title">Request Vacation</h4>
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

export default RequestVacation;
