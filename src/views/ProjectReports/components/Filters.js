import React from 'react';
import Select from '../../../components/Form/Select';
import DateFilter from '../../../components/General/DateFilter';
import ViewWrapper from '../../../components/General/ViewWrapper';

const Filters = props => {
    const {
        projectsList,
        companiesList,
        filterProject,
        filterChangeEvent,
        jobType,
        filterJobType,
        filterCompany
    } = props;
    return (
        <ViewWrapper title="AM2 Project Reports">
            <div className="am2-filters">
                <Select
                    name="filterProject"
                    label="Filter by Project:"
                    list={projectsList}
                    value={filterProject}
                    parentClass="form__column col-14"
                    inputChangeEvent={filterChangeEvent}
                />
                <Select
                    name="filterJobType"
                    label="Filter by Job Type:"
                    list={jobType}
                    value={filterJobType}
                    parentClass="form__column col-14"
                    inputChangeEvent={filterChangeEvent}
                />
                <Select
                    name="filterCompany"
                    label="Filter by Company:"
                    list={companiesList}
                    value={filterCompany}
                    parentClass="form__column col-14"
                    inputChangeEvent={filterChangeEvent}
                />
                <div className="form__column col-14">
                    <label htmlFor="filterDate">Filter by Date:</label>
                    <DateFilter inputChangeEvent={filterChangeEvent} />
                </div>
            </div>
        </ViewWrapper>
    );
};

Filters.defaultProps = {
    jobType: [
        { id: '', title: 'All Types' },
        { id: '2', title: 'Dev' },
        { id: '0', title: 'PM' },
        { id: '1', title: 'Web Design' },
        { id: '13', title: 'Graphic Design' },
        { id: '3', title: 'Personal development' },
        { id: '4', title: 'Administration' },
        { id: '5', title: 'Meeting (client)' },
        { id: '6', title: 'Meeting (internal)' },
        { id: '7', title: 'Team Management' },
        { id: '8', title: 'QA' },
        { id: '9', title: 'Support' },
        { id: '10', title: 'Preparing quote' },
        { id: '11', title: 'Content Transfer' },
        { id: '12', title: 'Junior Training' }
    ]
};

export default Filters;
