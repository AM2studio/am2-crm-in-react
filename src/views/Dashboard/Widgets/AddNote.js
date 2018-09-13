import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WP_API from '../../../data/Api';
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

    addUserNote = () => {
        const api = new WP_API();
        api.setPost('user-note', '', this.state);
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
        const { users } = this.props;
        const { note_for, content, note_type, status } = this.state; // eslint-disable-line  camelcase

        const userList = users.map(user => ({
            id: user.id,
            title: `${user.first_name} ${user.last_name}`
        }));

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
                list: userList,
                placeholder: 'Select User',
                required: true,
                value: note_for,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Select,
                name: 'note_type',
                placeholder: 'Select User',
                label: 'Type',
                list: noteType,
                required: true,
                value: note_type,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Textarea,
                name: 'content',
                label: 'Comment',
                rows: '4',
                required: true,
                value: content,
                parentClass: 'form__column col-1 form__row'
            }
        ];
        // Notification Text
        let msgText = 'Thanks for the Note!';
        if (status === 'error') {
            msgText = 'Upss.. something went wrong! Check with Goran.';
        }
        if (users.length === 0) {
            return <LoadingWidget />;
        }
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="section col-14 widget widget--usernotes"
                transitionAppear
                transitionName="loadComponentNotes"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppearTimeout={500}
            >
                <header className="section__header">
                    <h4 className="section__title">Add New User Note</h4>
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
                                        placeholder={field.placeholder}
                                        inputChangeEvent={this.inputChangeEvent}
                                    />
                                ))}
                            </div>
                            <div className="form__row">
                                <button
                                    type="button"
                                    className="button button--primary button--custom"
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
