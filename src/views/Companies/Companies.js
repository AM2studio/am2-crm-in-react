import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import AM2Modal from '../../components/General/Modal';
import CompaniesEdit from './CompaniesEdit';

const Companies = props => {
    const { data, columns, modal, editId, handleModalClose } = props;
    return (
        <ViewWrapper title="Companies">
            <AM2Table rows={data} columns={columns} itemsPerPage={10} />
            <AM2Modal open={modal} editId={editId} handleModalClose={handleModalClose}>
                <CompaniesEdit handleModalClose={handleModalClose} />
            </AM2Modal>
        </ViewWrapper>
    );
};

export default Companies;
