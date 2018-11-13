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
        filterUser
    } = props;
    return (
        <ViewWrapper title="Time Entries">
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
                    name="filterUser"
                    label="Filter by User:"
                    list={usersList}
                    value={filterUser}
                    parentClass="form__column col-14"
                    inputChangeEvent={filterChangeEvent}
                />
                <div className="form__column col-14">
                    <label htmlFor="filterDate">Filter by Date:</label>
                    <DateFilter inputChangeEvent={filterChangeEvent} />
                </div>
            </div>
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
