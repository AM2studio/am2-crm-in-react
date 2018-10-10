import React from 'react';
import loader from '../../styles/images/loading.gif';

const Loading = props => {
    const { className, width = 600, height = 450 } = props;
    return (
        <div className={`am2Loader ${className}`}>
            <img alt="loader" src={loader} width={width} height={height} />;
        </div>
    );
};

export default Loading;
