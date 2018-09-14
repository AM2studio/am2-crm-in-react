import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Notes = props => {
    const { data, columns } = props;
    return (
        <ViewWrapper title="User Notes">
            <AM2Table rows={data} columns={columns} itemsPerPage={10} />
        </ViewWrapper>
    );
};

export default Notes;
