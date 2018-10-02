import React from 'react';

export default props => {
    const { label, value, name, parentClass, list, inputChangeEvent } = props;
    let { required } = props;
    if (required) {
        required = <span className="form__required">* (required)</span>;
    }

    return (
        <div className={parentClass}>
            <h6>
                {label}
                {required}
            </h6>
            {list &&
                list.map(item => (
                    <div key={item.id} className="form__column">
                        <input
                            type="radio"
                            name={name}
                            onChange={inputChangeEvent}
                            value={item.id}
                            id={item.id}
                            checked={value && value.indexOf(item.id) !== -1}
                        />
                        <label htmlFor={item.id}>{item.title}</label>
                    </div>
                ))}
        </div>
    );
};
