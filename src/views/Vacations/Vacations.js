import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Notes = props => {
    const { data, columns, itemsPerPage, totalRecords, loading, onPageChanged } = props;
    return (
        <ViewWrapper title="AM2 Vacations">
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
