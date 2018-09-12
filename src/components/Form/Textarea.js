import React from 'react';

export default props => {
    const { label, parentClass, name, propType, inputChangeEvent, ...rest } = props;
    let { required } = props;

    if (required) {
        required = <span className="form__required">* (required)</span>;
    }

    return (
        <div className={parentClass}>
            <label htmlFor={name}>
                {label}
                {required}
            </label>
            <textarea name={name} onChange={inputChangeEvent} {...rest} />
        </div>
    );
};
