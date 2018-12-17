import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import NoResults from '../../components/General/NoResults';
import PDFCreator from './components/PDFCreator';

const ProjectReports = props => {
    const { data, columns, empty, pdfRows } = props;

    return (
        <React.Fragment>
            {empty || data.length === 0 ? (
                <NoResults />
            ) : (
                <ViewWrapper title="Project Time Entries" className="withTopMargin">
                    <PDFCreator rows={pdfRows} />
                    <AM2Table rows={data} columns={columns} />
                </ViewWrapper>
            )}
        </React.Fragment>
    );
};

export default ProjectReports;
