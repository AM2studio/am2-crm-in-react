import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WP_API from '../../../data/Api';
import SlackAPI from '../../../data/SlackAPI';
import Select from '../../../components/Form/Select';
import Textarea from '../../../components/Form/Textarea';
import Notification from '../../../components/Form/Notification';
import LoadingWidget from './LoadingWidget';

class AddNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            note_for: '',
            note_type: '',
            content: '',
            msgText: '',
            selectedUser: '',
            status: false,
            loader: false
        };
    }

    componentWillMount() {
        this.initialState = this.state;
    }

    inputChangeEvent = e => {
        const { name, value, label } = e.target;

        if (name === 'note_for') {
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

    addUserNote = () => {
        // Validation
        const { note_for: noteFor, note_type: noteType, content, selectedUser } = this.state; // eslint-disable-line camelcase
        if (noteFor === '' || noteType === '' || content === '') {
            this.setState(() => ({ status: 'is-danger', msgText: 'Required fields are missing.' }));
            return;
        }
        // Fire loader
        this.setState(() => ({ loader: true }));
        // Fetch API
        const api = new WP_API();
        api.set('user-note', '', this.state).then(result => {
            if (result.success === true) {
                this.setState(this.initialState);
                this.setState(() => ({ status: 'is-success', msgText: 'Thanks for the Note!' }));
                const user = localStorage.getItem('crmUserName');
                const slackAPI = new SlackAPI(
                    'https://hooks.slack.com/services/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'
                );
                const notificationTitle = `New note added by ${user} for ${selectedUser}: ${content}`; // eslint-disable-line camelcase
                slackAPI.send(notificationTitle, 'management-am2');
            } else {
                this.setState(() => ({
                    status: 'is-danger',
                    msgText: 'Ups..something went wrong. Check with Goran!',
                    loader: false
                }));
                console.log('Something went wrong!');
            }
        });
    };

    render() {
        const { users } = this.props;
        const { note_for, content, note_type, status, loader, msgText } = this.state; // eslint-disable-line  camelcase

        const noteType = [
            { id: '0', title: 'Positive' },
            { id: '1', title: 'Negative' },
            { id: '2', title: 'Neutral' }
        ];
        const inputs = [
            {
                type: Select,
                name: 'note_for',
                label: 'For user',
                list: users,
                placeholder: 'Select User',
                required: true,
                value: note_for
            },
            {
                type: Select,
                name: 'note_type',
                placeholder: 'Note Type',
                label: 'Type',
                list: noteType,
                required: true,
                value: note_type
            },
            {
                type: Textarea,
                name: 'content',
                label: 'Comment',
                rows: '4',
                required: true,
                value: content
            }
        ];

        if (loader === true || users.length === 0) {
            return <LoadingWidget className="column widget widget--usernotes" title="Add New User Note" />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="column widget widget--usernotes"
                transitionAppear
                transitionName="loadComponentNotes"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={0}
            >
                <header className="widget__header">
                    <h4 className="widget__title">Add New User Note</h4>
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
                                    placeholder={field.placeholder}
                                    inputChangeEvent={this.inputChangeEvent}
                                />
                            ))}
                            <div className="field">
                                <button
                                    type="button"
                                    className="button is-primary is-fullwidth"
                                    onClick={this.addUserNote}
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

export default AddNote;
