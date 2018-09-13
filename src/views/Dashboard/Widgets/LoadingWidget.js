import React from 'react';
import loader from '../../../styles/images/loader.gif';

const loadingWidget = props => {
    const { title, className } = props;

    return (
        <div className={`section col-14 widget ${className}`}>
            <header className="section__header">
                <h4 className="section__title">{title}</h4>
            </header>
            <div className="section__content">
                <div className="widget">
                    <div className="loaderWidget">
                        <img alt="loader" src={loader} width="64" height="64" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default loadingWidget;
