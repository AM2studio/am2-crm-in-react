import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const UsersEdit = props => {
    const { data, columns, addUser } = props;
    return (
        <ViewWrapper title="Users">
            <p className="negative-margin text-right">
                <button type="button" className="button button--primary" onClick={addUser}>
                    Add New
                </button>
            </p>
            <AM2Table rows={data} columns={columns} itemsPerPage={10} />
        </ViewWrapper>
    );
};

export default UsersEdit;
