import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import Select from '../../components/Form/Select';
import NoResults from '../../components/General/NoResults';

const Notes = props => {
    const {
        data,
        columns,
        itemsPerPage,
        totalRecords,
        loading,
        onPageChanged,
        empty,
        projectsList,
        filterProject,
        filterChangeEvent,
        usersList,
        filterUser
    } = props;

    if (usersList) {
        usersList.unshift({ id: '', title: 'All Users' });
    }

    if (projectsList) {
        projectsList.unshift({ id: '', title: 'All Projects' });
    }
    return (
        <ViewWrapper title="AM2 Project Earnings">
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
                    label="Filter by PM:"
                    list={usersList}
                    value={filterUser}
                    parentClass="form__column col-14"
                    inputChangeEvent={filterChangeEvent}
                />
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

export default Notes;
