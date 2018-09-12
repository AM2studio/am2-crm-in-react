import React from 'react';

export default props => {
    const { type, text, close } = props;

    return (
        <div className={`notification notification--${type}`} role="alert">
            <button
                type="button"
                className="notification__close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={close}
            >
                <span aria-hidden="true">×</span>
            </button>
            <p>
                <strong>{text}</strong>
            </p>
        </div>
    );
};
