import React from 'react';

const ComponentHeader = props => {
    const { title } = props;
    return (
        <header className="section__header">
            <h2 className="section__title">{title}</h2>
        </header>
    );
};

export default ComponentHeader;
