import React from 'react';
import loader from '../../../styles/images/animation.gif';

const loadingWidget = props => {
    const { title, className } = props;

    return (
        <div className={className}>
            <header className="section__header">
                <h4 className="section__title">{title}</h4>
            </header>
            <div className="section__content">
                <div className="widget">
                    <div className="loaderWidget">
                        <img alt="loader" src={loader} width="400" height="300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default loadingWidget;
