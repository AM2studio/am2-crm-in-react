import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import Select from '../../components/Form/Select';
import NoResults from '../../components/General/NoResults';
import DateFilter from '../../components/General/DateFilter';

const TimeEntries = props => {
    const {
        data,
        columns,
        itemsPerPage,
        totalRecords,
        loading,
        empty,
        onPageChanged,
        projectsList,
        filterProject,
        filterChangeEvent,
        usersList,
        filterUser,
        isAdmin
    } = props;

    usersList.unshift({ id: '', title: 'All Users' });
    projectsList.unshift({ id: '', title: 'All Projects' });

    return (
        <ViewWrapper title="Time Entries">
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <Select
                            name="filterProject"
                            label="Filter by Project:"
                            list={projectsList}
                            value={filterProject}
                            parentClass="field--medium"
                            inputChangeEvent={filterChangeEvent}
                        />
                    </div>
                    {isAdmin && (
                        <div className="level-item">
                            <Select
                                name="filterUser"
                                label="Filter by User:"
                                list={usersList}
                                value={filterUser}
                                parentClass="field--medium"
                                inputChangeEvent={filterChangeEvent}
                            />
                        </div>
                    )}
                    <div className="level-item">
                        <div className="field field--medium">
                            <label className="label is-small" htmlFor="filterDate">
                                Filter by Date:
                            </label>
                            <DateFilter inputChangeEvent={filterChangeEvent} />
                        </div>
                    </div>
                </div>
            </nav>
            {!empty ? (
                <AM2Table
                    rows={data}
                    columns={columns}
                    itemsPerPage={itemsPerPage}
                    totalRecords={totalRecords}
                    loading={loading}
                    onPageChanged={onPageChanged}
                />
            ) : (
                <NoResults />
            )}
        </ViewWrapper>
    );
};

export default TimeEntries;
