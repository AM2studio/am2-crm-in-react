import React from 'react';

export default props => {
    const { label, value, name, parentClass, list, inputChangeEvent } = props;
    let { required } = props;
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
                    {list &&
                        list.map(item => (
                            <label key={item.id} className="checkbox" htmlFor={name + item.id}>
                                <input
                                    type="checkbox"
                                    name={name}
                                    onChange={inputChangeEvent}
                                    value={item.id}
                                    id={name + item.id}
                                    checked={value && value.indexOf(item.id) !== -1}
                                />
                                {item.title}
                            </label>
                        ))}
                </div>
            </div>
        </div>
    );
};
