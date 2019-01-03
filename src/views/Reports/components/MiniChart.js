import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default props => {
    const { totalHours, data, options, title } = props;
    return (
        <div className="miniChart">
            <span className="label">{title}</span>
            <span className="value">{totalHours}</span>
            <Doughnut data={data} options={options} />
        </div>
    );
};
