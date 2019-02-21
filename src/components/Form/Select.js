import React, { Component } from 'react';
import Select from 'react-select';

class AM2Select extends Component {
    constructor(props) {
        super(props);
        const { value, list } = this.props;

        if (value && list && list.length) {
            // So, this package requires selected value to be an object
            // Our select list is using id property ( this was prior to installing this package), so we first need to filter object via id = value
            // Then need to convert it to expected object
            if (Object.prototype.hasOwnProperty.call(list[0], 'id')) {
                const result = list.filter(obj => obj.id && obj.id.toString() === value.toString());
                let filteredResults;
                if (result !== undefined) {
                    filteredResults = result.map(o => ({ value: o.id, label: o.title }));
                    this.state = { selectedOption: filteredResults[0] };
                }
            } else {
                const result = list.filter(obj => obj.value && obj.value.toString() === value.toString());
                if (result !== undefined) {
                    this.state = { selectedOption: result };
                }
            }
        } else {
            this.state = { selectedOption: '' };
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps);
    //     if (nextProps.value !== prevState.selectedOption) {
    //         console.log(nextProps);
    //         return { selectedOption: { value: nextProps.value, label: nextProps.label } };
    //     }
    //     return null;
    // }

    handleChange = selectedOption => {
        const { name, inputChangeEvent } = this.props;
        this.setState({ selectedOption });
        // Lets fake input event.target object to pass same data like other inputs are passing
        const el = {
            target: {
                name,
                value: selectedOption.value,
                label: selectedOption.label
            }
        };
        inputChangeEvent(el);
    };

    render() {
        const { label, name, parentClass, list } = this.props;
        let { required } = this.props;
        const { selectedOption } = this.state;
        let formatedList = list;

        // No list? Dont render Select element.
        if (!list) {
            return '';
        }

        // Are we getting title and id from WordPress, if so, format it to label/value:
        if (list.length > 0 && !Object.prototype.hasOwnProperty.call(list[0], 'label')) {
            formatedList = list.map(listItem => ({
                ...listItem,
                label: listItem.title,
                value: listItem.id
            }));
        }

        if (required) {
            required = <span className="is-required">* (required)</span>;
        }

        return (
            <div className={`field ${parentClass || ''}`}>
                <label className="label is-small" htmlFor={name}>
                    {label}
                    {required}
                </label>
                <div className="control">
                    <div className="is-fullwidth">
                        <Select value={selectedOption} onChange={this.handleChange} options={formatedList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AM2Select;
