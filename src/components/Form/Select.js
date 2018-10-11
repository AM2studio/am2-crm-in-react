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
        // Lets fake input event.target object to pass same data like other inputs are passing
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

        let formatedList = list;
        // Are we getting title and id from WordPress, if so, format it to label/value:
        if (list.length > 0 && !Object.prototype.hasOwnProperty.call(list[0], 'label')) {
            formatedList = list.map(listItem => ({
                ...listItem,
                label: listItem.title,
                value: listItem.id
            }));
        }

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
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={formatedList}
                />
            </div>
        );
    }
}

export default AM2Select;
