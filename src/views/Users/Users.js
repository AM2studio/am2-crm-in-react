import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Users = props => {
    const { data, columns, addUser, itemsPerPage, totalRecords, loading, onPageChanged } = props;
    return (
        <ViewWrapper title="Users">
            <p className="negative-margin text-right">
                <button type="button" className="button is-primary" onClick={addUser}>
                    Add New
                </button>
            </p>
            <AM2Table
                rows={data}
                columns={columns}
                itemsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                loading={loading}
                onPageChanged={onPageChanged}
                clientFiltering
                clientSorting
            />
        </ViewWrapper>
    );
};

export default Users;
