import React, { Component } from 'react';
import Textarea from '../../../components/Form/Textarea';
import Select from '../../../components/Form/Select';

import '../../../styles/custom.css';

class AddNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            comment: ''
        };
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { companies } = this.props;
        const { user, comment } = this.state;

        const inputs = [
            {
                type: Select,
                name: 'user',
                label: 'For user',
                list: companies,
                required: true,
                value: user,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Textarea,
                name: 'comment',
                label: 'Comment',
                rows: '4',
                required: true,
                value: comment,
                parentClass: 'form__column col-1 form__row'
            }
        ];

        return (
            <div className="section col-14 widget widget--usernotes">
                <header className="section__header">
                    <h4 className="section__title">Add New User Note</h4>
                </header>
                <div className="section__content">
                    <div className="widget">
                        <form className="form">
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
                            <button type="button" className="button button--primary button--custom">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNote;
