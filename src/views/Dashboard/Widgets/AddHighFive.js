import React, { Component } from 'react';
import Textarea from '../../../components/Form/Textarea';
import Select from '../../../components/Form/Select';

import '../../../styles/custom.css';

class AddHighFive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hfUser: '',
            hfContent: ''
        };
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { hfUser, hfContent } = this.state;

        const inputs = [
            {
                type: Select,
                name: 'hfUser',
                label: 'To user',
                list: JSON.parse(localStorage.getItem('projects')),
                required: true,
                className: 'form__input',
                value: hfUser,
                parentClass: 'form__column col-1 form__row'
            },
            {
                type: Textarea,
                rows: '4',
                name: 'hfContent',
                label: 'For',
                required: true,
                value: hfContent,
                parentClass: 'form__column col-1 form__row'
            }
        ];

        return (
            <div className="section col-14 widget widget--highfive">
                <header className="section__header">
                    <h4 className="section__title">Give High Five</h4>
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddHighFive;
