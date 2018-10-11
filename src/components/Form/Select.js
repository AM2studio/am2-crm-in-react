import React, { Component } from 'react';
import Select from 'react-select';

class AM2Select extends Component {
    componentWillMount() {
        const { value, list } = this.props;

        // So, this package requires selected value to be an object
        // Our select list is using id property ( this was prior to installing this package), so we first need to filter object via id = value
        // Then need to convert it to expected object
        const result = list.filter(obj => obj.id.toString() === value);
        let filteredResults;
        if (result !== undefined) {
            filteredResults = result.map(o => ({ value: o.id, label: o.title }));
        }

        this.setState({ selectedOption: filteredResults[0] });
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
        let { required } = this.props;
        const { selectedOption } = this.state;
        let formatedList = list;
        // Are we getting title and id from WordPress, if so, format it to label/value:
        if (list.length > 0 && !Object.prototype.hasOwnProperty.call(list[0], 'label')) {
            formatedList = list.map(listItem => ({
                ...listItem,
                label: listItem.title,
                value: listItem.id
            }));
        }

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
