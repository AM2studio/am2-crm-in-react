import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ComponentHeader = props => {
    const { title, children } = props;
    return (
        <ReactCSSTransitionGroup
            transitionAppear
            transitionName="loadComponent"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
            <header className="section__header">
                <h2 className="section__title">{title}</h2>
            </header>
            <div className="section__content">{children}</div>
        </ReactCSSTransitionGroup>
    );
};

export default ComponentHeader;
