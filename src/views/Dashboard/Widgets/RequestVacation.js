import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WP_API from '../../../data/Api';
import SlackAPI from '../../../data/SlackAPI';
import Text from '../../../components/Form/Text';
import Textarea from '../../../components/Form/Textarea';
import DatePicker from '../../../components/Form/DatePicker';
import Notification from '../../../components/Form/Notification';
import LoadingWidget from './LoadingWidget';

class RequestVacation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start_date: '',
            end_date: '',
            days: '',
            note: '',
            status: false,
            loader: false
        };
    }

    componentWillMount() {
        this.initialState = this.state;
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    closeNotification = () => {
        this.setState(() => ({ status: false }));
    };

    requestVacation = () => {
        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        const { start_date, end_date, days, note } = this.state; // eslint-disable-line camelcase
        api.setPost('vacations', '', this.state);
        api.set().then(result => {
            if (result.success === true) {
                // Pop a success message
                this.setState(this.initialState);
                this.setState(() => ({ status: 'success' }));
                // Notify everyone on slack
                const user = sessionStorage.getItem('crmUserName');
                const slackAPI = new SlackAPI(
                    'https://hooks.slack.com/services/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'
                );
                const notificationTitle = `New vacation request by ${user} From ${start_date} until ${end_date} Working days: ${days}. ${note}`; // eslint-disable-line camelcase
                slackAPI.send(notificationTitle, 'management');
            } else {
                this.setState(() => ({ status: 'error', loader: false }));
            }
        });
    };

    render() {
        const { start_date, end_date, days, note, status, loader } = this.state; // eslint-disable-line camelcase

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
        if (loader === true) {
            return <LoadingWidget className="widget--vacation" title="Request Vacation" />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="section col-14 widget widget--vacation"
                transitionAppear
                transitionName="loadComponentVacation"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
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
            </ReactCSSTransitionGroup>
        );
    }
}

export default RequestVacation;
