import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import NoResults from '../../components/General/NoResults';

const ProjectReports = props => {
    const { data, columns, empty } = props;

    return (
        <React.Fragment>
            {empty || data.length === 0 ? (
                <NoResults />
            ) : (
                <ViewWrapper title="Project Time Entries" className="withTopMargin">
                    <AM2Table rows={data} columns={columns} />
                </ViewWrapper>
            )}
        </React.Fragment>
    );
};

export default ProjectReports;
