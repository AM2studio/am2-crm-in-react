import React from 'react';

export default props => {
    const { label, name, parentClass, inputChangeEvent, propType, ...rest } = props;
    let { required } = props;
    let type = 'text';

    if (required) {
        required = <span className="is-required">*</span>;
    }
    if (propType) {
        type = propType;
    }

    return (
        <div className={`field ${parentClass || ''}`}>
            <label className="label is-small" htmlFor={name}>
                {label}
                {required}
            </label>
            <div className="control">
                <input className="input" name={name} id={name} type={type} onChange={inputChangeEvent} {...rest} />
            </div>
        </div>
    );
};
