import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        let { value } = this.props;

        if (typeof value === 'undefined' || value === '') {
            value = moment().format('DD/MM/YYYY');
        }

        this.state = {
            date: moment(value, 'DD/MM/YYYY'),
            focused: null
        };
    }

    handleDateChange = date => {
        const { name, inputChangeEvent } = this.props;
        this.state.date = date;
        const e = { target: { name, value: date.format('DD/MM/YYYY') } };
        inputChangeEvent(e);
    };

    render() {
        const { label, name, parentClass } = this.props;
        let { required } = this.props;
        const { focused, date } = this.state;

        if (required) {
            required = <span className="is-required">*</span>;
        }

        return (
            <div className={`field ${parentClass || ''}`}>
                <label className="label is-small" htmlFor={name}>
                    {label}
                    {required}
                </label>
                <div className="control">
                    <SingleDatePicker
                        inputIconPosition="after"
                        small
                        regular
                        block
                        numberOfMonths={1}
                        date={date}
                        onDateChange={newDate => this.handleDateChange(newDate)}
                        focused={focused}
                        onFocusChange={e => this.setState(e)}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
        );
    }
}
