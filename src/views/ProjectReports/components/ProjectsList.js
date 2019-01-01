import React, { Component } from 'react';

export default class extends Component {
    render() {
        const { projectData, name, billable } = this.props;
        return projectData.id !== '0' ? (
            <section className="section withTopMargin">
                <header className="section__header">
                    <h2 className="section__title">{name}</h2>
                </header>
                <div className="section__content section--topstats">
                    <div className="topstats positive">
                        <div className="label">Project Total Hours</div>
                        <div className="value">{billable}</div>
                    </div>
                    {Object.values(projectData).map(project => (
                        <div className="topstats">
                            <div className="label">Milestone: {project.name}</div>
                            <div className="value">{project.billable}</div>
                        </div>
                    ))}
                </div>
            </section>
        ) : (
            ''
        );
    }
}
