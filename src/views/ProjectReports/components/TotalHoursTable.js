import React from 'react';
import ViewWrapper from '../../../components/General/ViewWrapper';
import AM2Table from '../../../components/Table/AM2Table';

const TotalHoursTable = props => {
    const { data, columns, empty, title, className } = props;
    return (
        <React.Fragment>
            {empty || data.length === 0 ? (
                ''
            ) : (
                <div className={`section__third ${className}`}>
                    <ViewWrapper title={title}>
                        <AM2Table rows={data} columns={columns} />
                    </ViewWrapper>
                </div>
            )}
        </React.Fragment>
    );
};

export default TotalHoursTable;
