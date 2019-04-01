import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

class DateFilter extends Component {
    constructor(props) {
        super(props);

        const date = new Date();
        this.state = {
            start: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 'DD/MM/YYYY'),
            end: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7), 'DD/MM/YYYY'),
            focusedInput: null
        };
    }

    handleDateChange = (start, end) => {
        const { inputChangeEvent } = this.props;
        this.setState({ start, end });
        const el = {
            target: {
                name: 'filterDate',
                value: { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') }
            }
        };
        inputChangeEvent(el);
    };

    render() {
        const { label, name, parentClass } = this.props;
        let { required } = this.props;
        const { start, end, focusedInput } = this.state;

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
                    <DateRangePicker
                        inputIconPosition="after"
                        small
                        regular
                        block
                        numberOfMonths={2}
                        startDate={start}
                        startDateId="startDateId"
                        endDateId="endDateId"
                        endDate={end}
                        onDatesChange={({ startDate, endDate }) => this.handleDateChange(startDate, endDate)}
                        focusedInput={focusedInput}
                        onFocusChange={focused => this.setState({ focusedInput: focused })}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
        );
    }
}

export default DateFilter;
