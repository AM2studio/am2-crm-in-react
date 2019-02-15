import React from 'react';

export default props => {
    const { label, parentClass, name, propType, inputChangeEvent, ...rest } = props;
    let { required } = props;

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
                <textarea className="textarea" name={name} onChange={inputChangeEvent} {...rest} />
            </div>
        </div>
    );
};
