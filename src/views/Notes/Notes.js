import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import Select from '../../components/Form/Select';
import AM2Table from '../../components/Table/AM2Table';

const Notes = props => {
    const {
        data,
        columns,
        itemsPerPage,
        totalRecords,
        loading,
        onPageChanged,
        usersList,
        filterChangeEvent,
        filterUser
    } = props;
    return (
        <ViewWrapper title="User Notes">
            <nav className="level">
                <div className="level-left">
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
                </div>
            </nav>
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

export default Notes;
