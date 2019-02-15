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
            <nav className="level">
                <div className="level-left">
                    {permission && (
                        <div className="level-item">
                            <Select
                                name="filterUser"
                                label="Filter by User:"
                                list={appendAllUsersSelect}
                                value={filterUser}
                                parentClass="field--medium"
                                inputChangeEvent={filterChangeEvent}
                            />
                        </div>
                    )}
                    <div className="level-item">
                        <Select
                            name="filterProject"
                            label="Filter by Project:"
                            list={appendAllProjectSelect}
                            value={filterProject}
                            parentClass="field--medium"
                            inputChangeEvent={filterChangeEvent}
                        />
                    </div>
                    <div className="level-item">
                        <Select
                            name="filterJobType"
                            label="Filter by Job Type:"
                            list={jobType}
                            value={filterJobType}
                            parentClass="field--medium"
                            inputChangeEvent={filterChangeEvent}
                        />
                    </div>
                    <div className="level-item">
                        <Select
                            name="filterCompany"
                            label="Filter by Company:"
                            list={appendAllCompanySelect}
                            value={filterCompany}
                            parentClass="field--medium"
                            inputChangeEvent={filterChangeEvent}
                        />
                    </div>
                    <div className="level-item">
                        <div className="field field--medium">
                            <label className="label is-small" htmlFor="filterDate">
                                Filter by Date:
                            </label>
                            <DateFilter inputChangeEvent={filterChangeEvent} />
                        </div>
                    </div>

                    <div className="level-item">
                        <label className="label is-small" htmlFor="filterOn" />
                        <button
                            type="button"
                            onClick={getFilteredData}
                            className={`button is-primary no-label ${loading ? 'is-loading' : ''}`}
                        >
                            Filter Report
                        </button>
                    </div>
                </div>
            </nav>
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
