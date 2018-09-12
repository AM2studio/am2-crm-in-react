import React from 'react';

export default props => {
    const { label, name, parentClass, list, inputChangeEvent, ...rest } = props;
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
            <select name={name} id={name} onChange={inputChangeEvent} {...rest}>
                {list &&
                    list.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
            </select>
        </div>
    );
};
