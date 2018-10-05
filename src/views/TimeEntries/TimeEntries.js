import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const TimeEntries = props => {
    const { data, columns } = props;
    return (
        <ViewWrapper title="Time Entries">
            <AM2Table rows={data} columns={columns} itemsPerPage={10} />
        </ViewWrapper>
    );
};

export default TimeEntries;
