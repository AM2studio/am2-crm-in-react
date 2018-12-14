import React from 'react';

const ComponentHeader = props => {
    const { title, children, className } = props;
    return (
        <React.Fragment>
            <header className={`section__header ${className}`}>
                <h2 className="section__title">{title}</h2>
            </header>
            <div className="section__content">{children}</div>
        </React.Fragment>
    );
};

export default ComponentHeader;
