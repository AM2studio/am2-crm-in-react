import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Companies = props => {
    const { data, columns, addCompany, itemsPerPage, totalRecords, loading, onPageChanged } = props;
    return (
        <ViewWrapper title="Companies">
            <p className="negative-margin text-right">
                <button type="button" className="button button--primary" onClick={addCompany}>
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

export default Companies;
