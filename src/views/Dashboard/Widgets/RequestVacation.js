import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WP_API from '../../../data/Api';
import SlackAPI from '../../../data/SlackAPI';
import Text from '../../../components/Form/Text';
import Textarea from '../../../components/Form/Textarea';
import DatePicker from '../../../components/Form/MultiDatePicker';
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
            msgText: '',
            status: 'pending',
            sent: false,
            loader: false
        };
    }

    componentWillMount() {
        this.initialState = this.state;
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;

        if (name === 'filterDate') {
            this.setState({ start_date: value.start, end_date: value.end, sent: false });
        } else {
            this.setState({ [name]: value, sent: false });
        }
    };

    closeNotification = () => {
        this.setState(() => ({ sent: false }));
    };

    requestVacation = () => {
        const { start_date: startDate, end_date: endDate, days, note } = this.state; // eslint-disable-line camelcase
        console.log(this.state);
        // Validation
        if (startDate === '' || endDate === '' || days === '') {
            this.setState(() => ({ sent: 'is-danger', msgText: 'Required fields are missing.' }));
            return;
        }
        // Proceed
        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        api.set('vacations', '', this.state).then(result => {
            if (result.success === true) {
                // Pop a success message
                this.setState(this.initialState);
                this.setState(() => ({
                    sent: 'is-success',
                    msgText: 'Request sent! We will get back to you soon.'
                }));
                // Notify everyone on slack
                const user = localStorage.getItem('crmUserName');
                const slackAPI = new SlackAPI(
                    'https://hooks.slack.com/services/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'
                );
                const notificationTitle = `New vacation request by ${user} From ${startDate} until ${endDate} Working days: ${days}. ${note}`; // eslint-disable-line camelcase
                slackAPI.send(notificationTitle, 'management-am2');
            } else {
                this.setState(() => ({
                    sent: 'is-danger',
                    msgText: 'Ups..something went wrong. Check with Goran!',
                    loader: false
                }));
            }
        });
    };

    render() {
        const { days, note, sent, loader, msgText } = this.state; // eslint-disable-line camelcase

        const inputs = [
            {
                type: DatePicker,
                name: 'start_date',
                label: 'Vacation Date',
                required: true
            },
            {
                type: Text,
                name: 'days',
                label: 'Working Days',
                propType: 'number',
                min: 1,
                required: true,
                value: days
            },
            {
                type: Textarea,
                name: 'note',
                label: 'Comment',
                rows: '4',
                required: true,
                value: note
            }
        ];

        if (loader === true) {
            return <LoadingWidget className="column widget widget--vacation" title="Request Vacation" />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="column widget widget--vacation"
                transitionAppear
                transitionName="loadComponentVacation"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
                <header className="widget__header">
                    <h4 className="widget__title">Request Vacation</h4>
                </header>
                <div className="widget__content has-background-white">
                    <div className="widget">
                        <form className="form">
                            {sent ? <Notification text={msgText} type={sent} close={this.closeNotification} /> : ''}

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
                                    inputChangeEvent={this.inputChangeEvent}
                                    min={field.min}
                                />
                            ))}

                            <div className="field">
                                <button
                                    type="button"
                                    className="button is-primary is-fullwidth"
                                    onClick={this.requestVacation}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

export default RequestVacation;
