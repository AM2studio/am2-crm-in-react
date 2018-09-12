import React, { Component } from 'react';
import WP_API from '../../../data/Api';
import Select from '../../../components/Form/Select';
import Textarea from '../../../components/Form/Textarea';
import Notification from '../../../components/Form/Notification';

import '../../../styles/custom.css';

class AddHighFive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hf_user_to_id: '',
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

    giveHighFive = () => {
        const api = new WP_API();
        api.setPost('high-five', '', this.state);
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
        const { hf_user_to_id, content, status } = this.state; // eslint-disable-line camelcase

        const userList = users.map(user => ({
            id: user.id,
            title: `${user.first_name} ${user.last_name}`
        }));

        const inputs = [
            {
                type: Select,
                name: 'hf_user_to_id',
                label: 'To user',
                list: userList,
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
        // Notification Text
        let msgText = 'Wooot a high five? You are a good friend!';
        if (status === 'error') {
            msgText = 'Upss.. something went wrong! Check with Goran.';
        }

        return (
            <div className="section col-14 widget widget--highfive">
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
            </div>
        );
    }
}

export default AddHighFive;
