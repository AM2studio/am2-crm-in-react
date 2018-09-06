import React from 'react';

export default props => {
    const { title, name, parentClass, email, value, inputChangeEvent } = props;
    let { required, className = 'form__input' } = props;
    let type = 'text';

    if (required) {
        className += ' validate';
        required = <span className="form__required">* (required)</span>;
    }
    if (email) {
        type = 'email';
    }

    return (
        <div className={parentClass}>
            <label htmlFor={name}>
                {title}
                {required}
            </label>
            <input
                required
                name={name}
                id={name}
                type={type}
                className={className}
                value={value}
                onChange={inputChangeEvent}
            />
        </div>
    );
};
