import React from 'react';
import ComponentHeader from '../../components/General/ComponentHeader';
import AM2Table from '../../components/Table/AM2Table';

const Companies = props => {
    const { data, columns } = props;
    return (
        <div>
            <ComponentHeader title="Companies" />
            <div className="section__content">
                <AM2Table data={data} columns={columns} itemsPerPage={10} />
            </div>
        </div>
    );
};

export default Companies;
