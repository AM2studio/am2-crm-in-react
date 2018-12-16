import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import NoResults from '../../components/General/NoResults';

const ProjectReports = props => {
    const { data, columns, loading, onPageChanged, empty, projectsList } = props;

    if (projectsList) {
        projectsList.unshift({ id: '', title: 'All Projects' });
    }
    return (
        <React.Fragment>
            {empty || data.length === 0 ? (
                <NoResults />
            ) : (
                <ViewWrapper title="Project Time Entries" className="withTopMargin">
                    <AM2Table
                        rows={data}
                        columns={columns}
                        loading={loading}
                        onPageChanged={onPageChanged}
                    />
                </ViewWrapper>
            )}
        </React.Fragment>
    );
};

export default ProjectReports;
