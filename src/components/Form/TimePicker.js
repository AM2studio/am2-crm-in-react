import React, { Component } from 'react';
import TimePicker from 'react-times';

import 'react-times/css/material/default.css';

class Time extends Component {
    handleTimeChange = time => {
        const { name, inputChangeEvent } = this.props;
        const { hour, minute } = time;
        const e = { target: { name, value: `${hour}:${minute}` } };
        inputChangeEvent(e);
    };

    render() {
        const { label, name, parentClass } = this.props;
        let { value, required } = this.props;

        if (typeof value === 'undefined' || value === '') {
            value = '01:00';
        }
        if (required) {
            required = <span className="form__required">* (required)</span>;
        }

        return (
            <div className={parentClass}>
                <label htmlFor={name}>
                    {label}
                    {required}
                </label>

                <TimePicker time={value} onTimeChange={e => this.handleTimeChange(e)} />
            </div>
        );
    }
}

export default Time;
