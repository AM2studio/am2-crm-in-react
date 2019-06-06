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
            this.setState(() => ({ status: 'is-danger', msgText: 'Required fields are missing.' }));
            return;
        }

        this.setState(() => ({ loader: true }));
        const api = new WP_API();
        api.set('high-five', '', this.state).then(result => {
            if (result.success === true) {
                // Pop a success message
                this.setState(this.initialState);
                this.setState(() => ({
                    status: 'is-success',
                    msgText: 'Wooot a high five? You are a good friend!'
                }));
                // Notify everyone on slack
                const slackAPI = new SlackAPI();
                const notificationTitle = 'New highfive is added!';
                const user = localStorage.getItem('crmUserName');
                const title = `${user} gave high5 to ${selectedUser}:`;
                slackAPI.send(notificationTitle, 'highfive', title, content);
            } else {
                this.setState(() => ({
                    status: 'is-danger',
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
                value: hf_user_to_id
            },
            {
                type: Textarea,
                rows: '4',
                name: 'content',
                label: 'For',
                required: true,
                value: content
            }
        ];

        if (loader === true || users.length === 0) {
            return <LoadingWidget className="column widget widget--highfive" title="Give High Five" />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="column widget widget--highfive"
                transitionAppear
                transitionName="loadComponentHighFive"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
                <header className="widget__header">
                    <h4 className="widget__title">Give High Five</h4>
                </header>
                <div className="widget__content has-background-white">
                    <div className="widget">
                        <form className="form">
                            {status ? <Notification text={msgText} type={status} close={this.closeNotification} /> : ''}
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
                                    inputChangeEvent={this.inputChangeEvent}
                                />
                            ))}
                            <div className="field">
                                <button
                                    type="button"
                                    className="button is-primary is-fullwidth"
                                    onClick={this.giveHighFive}
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

export default AddHighFive;
