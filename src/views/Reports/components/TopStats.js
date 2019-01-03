import React, { Component } from 'react';

export default class extends Component {
    render() {
        const { milestoneData } = this.props;
        return milestoneData.id !== '0' ? (
            <section className="section withTopMargin">
                <header className="section__header">
                    <h2 className="section__title">{milestoneData.name} Milestone</h2>
                </header>
                <div className="section__content section--topstats">
                    {milestoneData.hourly_rate !== '0' && (
                        <div className="topstats">
                            <div className="label">Hourly Rate (CAD)</div>
                            <div className="value">${milestoneData.hourly_rate}</div>
                        </div>
                    )}
                    {milestoneData.quoted_hours !== '0' && (
                        <div className="topstats">
                            <div className="label">Quoted Hours</div>
                            <div className="value">{milestoneData.quoted_hours}</div>
                        </div>
                    )}
                    <div className="topstats">
                        <div className="label">Spent Hours</div>
                        <div className="value">{milestoneData.billable}</div>
                    </div>
                    <div className="topstats">
                        <div className="label">Completion rate</div>
                        <div className="value">{milestoneData.completion_rate}</div>
                    </div>
                    <div className="topstats positive">
                        <div className="label">Income (CAD)</div>
                        <div className="value">${milestoneData.income}</div>
                    </div>
                    <div className="topstats negative">
                        <div className="label">Cost (CAD)</div>
                        <div className="value">${milestoneData.total_cost}</div>
                    </div>
                    <div className={`topstats ${milestoneData.margin > 0.6 ? 'positive' : 'negative'}`}>
                        <div className="label">Margin</div>
                        <div className="value">{milestoneData.margin}</div>
                    </div>
                </div>
            </section>
        ) : (
            ''
        );
    }
}
