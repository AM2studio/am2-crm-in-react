import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

class DateFilter extends Component {
    constructor(props) {
        super(props);

        const date = new Date();
        this.state = {
            start: moment(new Date(date.getFullYear(), date.getMonth(), 1), 'DD/MM/YYYY'),
            end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'DD/MM/YYYY'),
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
        const { start, end, focusedInput } = this.state;
        return (
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
                onDatesChange={({ startDate, endDate }) =>
                    this.handleDateChange(startDate, endDate)
                }
                focusedInput={focusedInput}
                onFocusChange={focused => this.setState({ focusedInput: focused })}
                isOutsideRange={() => false}
            />
        );
    }
}

export default DateFilter;
