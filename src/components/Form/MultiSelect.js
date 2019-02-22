import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

class AM2Select extends Component {
    constructor(props) {
        super(props);
        const { value, list } = this.props;
        this.state = { list, value: value || [], isLoading: false };
    }

    handleChange = (value, action) => {
        this.setState({ value, isLoading: false });
        const { multiSelectChangeEvent } = this.props;
        multiSelectChangeEvent(value, action);
    };

    handleCreate = option => {
        const { multiSelectChangeEvent } = this.props;
        const { value } = this.state;
        value.push({ label: option, value: option });
        multiSelectChangeEvent(option, 'createOption');
        this.setState({ value });
    };

    render() {
        const { label, name, parentClass } = this.props;
        let { required } = this.props;
        const { value, isLoading, list } = this.state;

        if (required) {
            required = <span className="is-required">*</span>;
        }

        return (
            <div className={`field ${parentClass || ''}`}>
                <label className="label is-small" htmlFor={name}>
                    {label}
                    {required}
                </label>
                <div className="control">
                    <div className="is-fullwidth">
                        <CreatableSelect
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            isClearable={false}
                            isMulti
                            onChange={this.handleChange}
                            onCreateOption={this.handleCreate}
                            options={list}
                            value={value}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AM2Select;
