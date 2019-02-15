import React from 'react';
import Loading from '../../../components/General/Loading';

const loadingWidget = props => {
    const { title, className } = props;

    return (
        <div className={className}>
            <header className="widget__header">
                <h4 className="widget__title">{title}</h4>
            </header>
            <div className="widget__content has-background-white">
                <div className="widget">
                    <Loading width="400" height="280" />
                </div>
            </div>
        </div>
    );
};

export default loadingWidget;
