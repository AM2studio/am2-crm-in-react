import React from 'react';
import { Bar } from 'react-chartjs-2';

export default props => {
    const { data } = props;
    return data ? (
        <div className="section__content section__minicharts">
            <div className="miniChartContainer">
                <div className="barChart">
                    <span className="label"> Users hours per day</span>
                    <Bar
                        height={280}
                        options={{
                            maintainAspectRatio: false,
                            tooltips: {
                                mode: 'nearest',
                                intersect: true
                            },
                            responsive: true,
                            scales: {
                                xAxes: [
                                    {
                                        type: 'time',
                                        time: {
                                            format: 'DD-MM-YYYY',
                                            unit: 'day'
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Dates'
                                        }
                                    }
                                ],
                                yAxes: [
                                    {
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Hours'
                                        }
                                    }
                                ]
                            }
                        }}
                        data={{
                            datasets: data
                        }}
                    />
                </div>
            </div>
        </div>
    ) : (
        ''
    );
};
