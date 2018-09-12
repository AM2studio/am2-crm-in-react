import React, { Component } from 'react';
import WP_API from '../../../data/Api';
import Text from '../../../components/Form/Text';
import Textarea from '../../../components/Form/Textarea';
import DatePicker from '../../../components/Form/DatePicker';
import Notification from '../../../components/Form/Notification';

import '../../../styles/custom.css';

class RequestVacation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start_date: '',
            end_date: '',
            days: '',
            note: '',
            status: false
        };
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    closeNotification = () => {
        this.setState(() => ({ status: false }));
    };

    requestVacation = () => {
        const api = new WP_API();
        api.setPost('vacations', '', this.state);
        api.set().then(result => {
            if (result.success === true) {
                this.setState(() => ({ status: 'success' }));
            } else {
                this.setState(() => ({ status: 'error' }));
                console.log('Something went wrong!');
            }
        });
    };

    render() {
        const { start_date, end_date, days, note, status } = this.state; // eslint-disable-line camelcase

        const inputs = [
            {
                type: DatePicker,
                name: 'start_date',
                label: 'Start Date',
                required: true,
                value: start_date,
                parentClass: 'form__row'
            },
            {
                type: DatePicker,
                name: 'end_date',
                label: 'End Date',
                required: true,
                value: end_date,
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
            },
            {
                type: Textarea,
                name: 'note',
                label: 'Comment',
                rows: '4',
                required: true,
                value: note,
                parentClass: 'form__column col-1 form__row'
            }
        ];
        // Notification Text
        let msgText = 'Request sent! We will get back to you soon.';
        if (status === 'error') {
            msgText = 'Upss.. something went wrong! Check with Goran.';
        }

        return (
            <div className="section col-14 widget widget--vacation">
                <header className="section__header">
                    <h4 className="section__title">Request Vacation</h4>
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
                            <button
                                type="button"
                                className="button button--primary button--custom"
                                onClick={this.requestVacation}
                            >
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
