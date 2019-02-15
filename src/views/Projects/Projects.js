import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Projects = props => {
    const { data, columns, addProject, itemsPerPage, actionBtns } = props;

    const loading = data.length === 0;
    const formatedData = data.map(project => ({
        ...project,
        btn: actionBtns(project.id)
    }));

    return (
        <ViewWrapper title="Projects">
            <p className="negative-margin text-right">
                <button type="button" className="button is-primary" onClick={addProject}>
                    Add New
                </button>
            </p>
            <AM2Table
                rows={formatedData}
                columns={columns}
                itemsPerPage={itemsPerPage}
                totalRecords={formatedData.length}
                loading={loading}
                clientFiltering
                clientSorting
            />
        </ViewWrapper>
    );
};

export default Projects;
