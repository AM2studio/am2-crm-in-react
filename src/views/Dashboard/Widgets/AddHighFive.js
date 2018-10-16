import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WP_API from '../../../data/Api';
import SlackAPI from '../../../data/SlackAPI';
import Select from '../../../components/Form/Select';
import Textarea from '../../../components/Form/Textarea';
import Notification from '../../../components/Form/Notification';
import LoadingWidget from './LoadingWidget';

class AddHighFive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hf_user_to_id: '',
            content: '',
            selectedUser: '',
            msgText: '',
            status: false,
            loader: false
        };
    }

    componentWillMount() {
        this.initialState = this.state;
    }

    inputChangeEvent = e => {
        const { name, value, label } = e.target;
        // Goran: check how to clean this up.
        if (name === 'hf_user_to_id') {
            this.setState({
                [name]: value,
                selectedUser: label,
                status: false
            });
        } else {
            this.setState({
                [name]: value,
                status: false
            });
        }
    };

    closeNotification = () => {
        this.setState(() => ({ status: false }));
    };

    giveHighFive = () => {
        // Validation
        const { hf_user_to_id: userId, content, selectedUser } = this.state; // eslint-disable-line camelcase
        if (userId === '' || content === '') {
            this.setState(() => ({ status: 'error', msgText: 'Required fields are missing.' }));
            return;
        }

        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        api.setPost('high-five', '', this.state);
        api.set().then(result => {
            if (result.success === true) {
                // Pop a success message
                this.setState(this.initialState);
                this.setState(() => ({
                    status: 'success',
                    msgText: 'Wooot a high five? You are a good friend!'
                }));
                // Notify everyone on slack
                const slackAPI = new SlackAPI();
                const notificationTitle = 'New highfive is added!';
                const user = sessionStorage.getItem('crmUserName');
                const title = `${user} gave high5 to ${selectedUser}:`;
                slackAPI.send(notificationTitle, 'highfive', title, content);
            } else {
                this.setState(() => ({
                    status: 'error',
                    loader: false,
                    msgText: 'Ups..something went wrong. Check with Goran!'
                }));
            }
        });
    };

    render() {
        const { users } = this.props;
        const { hf_user_to_id, content, status, loader, msgText } = this.state; // eslint-disable-line camelcase

        const inputs = [
            {
                type: Select,
                name: 'hf_user_to_id',
                label: 'To user',
                list: users,
                required: true,
                className: 'form__input',
                value: hf_user_to_id,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Textarea,
                rows: '4',
                name: 'content',
                label: 'For',
                required: true,
                value: content,
                parentClass: 'form__column col-1 form__row'
            }
        ];

        if (loader === true || users.length === 0) {
            return (
                <LoadingWidget
                    className="section col-14 widget widget--highfive"
                    title="Give High Five"
                />
            );
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="section col-14 widget widget--highfive"
                transitionAppear
                transitionName="loadComponentHighFive"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
                <header className="section__header">
                    <h4 className="section__title">Give High Five</h4>
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
                                        required={field.required}
                                        value={field.value}
                                        list={field.list}
                                        rows={field.rows}
                                        className="form__input"
                                        inputChangeEvent={this.inputChangeEvent}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="button button--primary button--custom"
                                onClick={this.giveHighFive}
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

export default AddHighFive;
