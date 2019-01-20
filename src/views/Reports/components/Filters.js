import React from 'react';
import Select from '../../../components/Form/Select';
import DateFilter from '../../../components/General/DateFilter';
import ViewWrapper from '../../../components/General/ViewWrapper';

const Filters = props => {
    const {
        projectsList,
        companiesList,
        usersList,
        filterUser,
        filterProject,
        filterChangeEvent,
        jobType,
        filterJobType,
        filterCompany,
        permission,
        getFilteredData,
        loading
    } = props;

    const appendAllUsersSelect = [{ id: '', title: 'All Users' }, ...usersList];
    const appendAllProjectSelect = [{ id: '', title: 'All Projects' }, ...projectsList];
    const appendAllCompanySelect = [{ id: '', title: 'All Companies' }, ...companiesList];

    return (
        <ViewWrapper title="AM2 Reports">
            <div className="am2-filters">
                {permission && (
                    <Select
                        name="filterUser"
                        label="Filter by User:"
                        list={appendAllUsersSelect}
                        value={filterUser}
                        parentClass="form__column col-16"
                        inputChangeEvent={filterChangeEvent}
                    />
                )}
                <Select
                    name="filterProject"
                    label="Filter by Project:"
                    list={appendAllProjectSelect}
                    value={filterProject}
                    parentClass="form__column col-16"
                    inputChangeEvent={filterChangeEvent}
                />
                <Select
                    name="filterJobType"
                    label="Filter by Job Type:"
                    list={jobType}
                    value={filterJobType}
                    parentClass="form__column col-16"
                    inputChangeEvent={filterChangeEvent}
                />
                <Select
                    name="filterCompany"
                    label="Filter by Company:"
                    list={appendAllCompanySelect}
                    value={filterCompany}
                    parentClass="form__column col-16"
                    inputChangeEvent={filterChangeEvent}
                />
                <div className="form__column col-16">
                    <label htmlFor="filterDate">Filter by Date:</label>
                    <DateFilter inputChangeEvent={filterChangeEvent} />
                </div>
                <div className="form__column col-16">
                    <button
                        type="button"
                        disabled={loading ? 'disabled' : false}
                        onClick={getFilteredData}
                        className="button button--primary button--filter"
                    >
                        Filter Report
                    </button>
                </div>
            </div>
            <div className="clearfix" />
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
