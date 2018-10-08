import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Projects = props => {
    const { data, columns, addProject, onPageChanged, itemsPerPage, totalRecords, loading } = props;
    return (
        <ViewWrapper title="Projects">
            <p className="negative-margin text-right">
                <button type="button" className="button button--primary" onClick={addProject}>
                    Add New
                </button>
            </p>
            <AM2Table
                onPageChanged={onPageChanged}
                rows={data}
                columns={columns}
                itemsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                loading={loading}
            />
        </ViewWrapper>
    );
};

export default Projects;
