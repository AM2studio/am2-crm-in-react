import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt, FaFlag } from 'react-icons/fa';
import Projects from './Projects';
import AM2Modal from '../../components/General/AM2Modal';
import ProjectsEdit from './ProjectsEdit';
import Milestones from './ProjectsMilestones';
import WP_API from '../../data/Api';
import { SharedDataConsumer } from '../../data/SharedDataContext';

class ProjectsContainer extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            modalType: '',
            singleProjectData: {},
            currentProject: ''
        };
    }

    addProject = () => {
        this.setState(() => ({
            modal: true,
            modalType: 'project',
            singleProjectData: false
        }));
    };

    editProject = (e, id) => {
        this.setState({ modal: true, modalType: 'project' });
        const { dataToFetch } = this.props;
        const data = new WP_API();
        data.get('projects', id, dataToFetch).then(result => {
            this.setState({ singleProjectData: result });
        });
    };

    editMilestones = (e, id) => {
        this.setState({ modal: true, modalType: 'milestones' });
        const data = new WP_API();
        data.get('milestones', id).then(result => {
            const milestones = result;
            this.setState({ projectMilestones: milestones.milestones, currentProject: id });
        });
    };

    handleModalClose = updated => {
        const { refreshProjects } = this.context;
        this.setState({ modal: false });
        if (updated === true) {
            refreshProjects(true);
        }
    };

    deleteProject = (e, id) => {
        console.log(`Deleting project with id: ${id}`);
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button is-primary"
                onClick={e => {
                    this.editProject(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button is-danger"
                onClick={e => {
                    this.deleteProject(e, id);
                }}
            >
                <FaTrashAlt />
            </button>
            <button
                type="button"
                className="button is-info"
                onClick={e => {
                    this.editMilestones(e, id);
                }}
            >
                <FaFlag />
            </button>
        </React.Fragment>
    );

    render() {
        const { modal, modalType, singleProjectData, projectMilestones, currentProject } = this.state;

        const columns = [
            { key: 'id', title: 'ID' },
            { key: 'title', title: 'Title' },
            { key: 'company', title: 'Company' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                <SharedDataConsumer>
                    {({ projects }) => (
                        <Projects
                            columns={columns}
                            data={projects}
                            addProject={this.addProject}
                            actionBtns={this.actionBtns}
                        />
                    )}
                </SharedDataConsumer>
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    {modalType === 'project' ? (
                        <SharedDataConsumer>
                            {({ companies }) => (
                                <ProjectsEdit
                                    singleProjectData={singleProjectData}
                                    companies={companies}
                                    handleModalClose={this.handleModalClose}
                                />
                            )}
                        </SharedDataConsumer>
                    ) : (
                        <Milestones
                            projectMilestones={projectMilestones}
                            project={currentProject}
                            handleModalClose={this.handleModalClose}
                        />
                    )}
                </AM2Modal>
            </React.Fragment>
        );
    }
}

ProjectsContainer.defaultProps = {
    dataToFetch: [
        'id',
        'title',
        'company_name',
        'company_id',
        'department_id',
        'total_price',
        'quoted_hours',
        'completion_rate',
        'hourly_rate',
        'payment_type',
        'currency',
        'project_mngr',
        'active_project',
        'start_date',
        'end_date',
        'rep_link',
        'staging_link',
        'slack_channel',
        'asanaID',
        'projectFeatures'
    ],
    itemsPerPage: 20
};

ProjectsContainer.contextType = SharedDataConsumer;

export default ProjectsContainer;
