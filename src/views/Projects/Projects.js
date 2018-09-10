import React from 'react';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';

const Projects = props => {
    const { data, columns, addProject } = props;
    return (
        <ViewWrapper title="Projects">
            <p className="negative-margin text-right">
                <button type="button" className="button button--primary" onClick={addProject}>
                    Add New
                </button>
            </p>
            <AM2Table rows={data} columns={columns} itemsPerPage={10} />
        </ViewWrapper>
    );
};

export default Projects;
