import React from 'react';

export default props => {
    const { title, name, parentClass, list, value, inputChangeEvent } = props;
    let { required, className = 'form__input' } = props;

    if (required) {
        className += ' validate';
        required = <span className="form__required">* (required)</span>;
    }

    return (
        <div className={parentClass}>
            <label htmlFor={name}>
                {title}
                {required}
            </label>
            <select
                required
                name={name}
                id={name}
                className={className}
                value={value}
                onChange={inputChangeEvent}
            >
                {list.map(item => (
                    <option value={item.id} selected={item.id === value ? 'selected' : ''}>
                        {item.title}
                    </option>
                ))}
            </select>
        </div>
    );
};
