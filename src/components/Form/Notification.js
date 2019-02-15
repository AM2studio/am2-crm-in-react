import React from 'react';

export default props => {
    const { type, text, close } = props;

    return (
        <div className={`notification ${type}`} role="alert">
            <button type="button" className="delete" data-dismiss="alert" aria-label="Close" onClick={close} />
            <p>
                <strong>{text}</strong>
            </p>
        </div>
    );
};
