import React from 'react';
import noResults from '../../styles/images/no-search-result.png';

const NoResults = props => {
    const { width = 600, height = 450 } = props;
    return (
        <div className="am2Loader">
            <img alt="loader" src={noResults} width={width} height={height} />;
        </div>
    );
};

export default NoResults;
