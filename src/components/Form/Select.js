import React, { Component } from 'react';
import Select from 'react-select';

class AM2Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null
        };
    }

    handleChange = selectedOption => {
        const { name, inputChangeEvent } = this.props;
        this.setState({ selectedOption });
        // Lets fake input event.target object to pass same data like the rest of inputs
        const el = {
            target: {
                name,
                value: selectedOption.value
            }
        };
        inputChangeEvent(el);
    };

    render() {
        const { label, name, parentClass, list } = this.props;
        let { required } = this.props;
        const { selectedOption } = this.state;
        if (required) {
            required = <span className="form__required">* (required)</span>;
        }

        return (
            <div className={parentClass}>
                <label htmlFor={name}>
                    {label}
                    {required}
                </label>
                <Select value={selectedOption} onChange={this.handleChange} options={list} />
            </div>
        );
    }
}

export default AM2Select;
