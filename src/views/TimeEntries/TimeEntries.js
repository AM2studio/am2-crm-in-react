import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import Select from '../../components/Form/Select';

const TimeEntries = props => {
    const {
        data,
        columns,
        itemsPerPage,
        totalRecords,
        loading,
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
            </div>
            <AM2Table
                rows={data}
                columns={columns}
                itemsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                loading={loading}
                onPageChanged={onPageChanged}
            />
        </ViewWrapper>
    );
};

export default TimeEntries;
