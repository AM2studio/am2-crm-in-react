import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Companies = props => {
    const { companies, columns, addCompany, itemsPerPage, totalRecords, actionBtns } = props;

    const loading = companies.length === 0;
    const formatedData = companies.map(company => ({
        ...company,
        btn: actionBtns(company.id)
    }));

    return (
        <ViewWrapper title="Companies">
            <p className="negative-margin text-right">
                <button type="button" className="button button--primary" onClick={addCompany}>
                    Add New
                </button>
            </p>
            <AM2Table
                rows={formatedData}
                columns={columns}
                itemsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                loading={loading}
                clientFiltering
                clientSorting
            />
        </ViewWrapper>
    );
};

export default Companies;
