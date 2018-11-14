import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt, FaFlag } from 'react-icons/fa';
import Projects from './Projects';
import AM2Modal from '../../components/General/AM2Modal';
import ProjectsEdit from './ProjectsEdit';
import Milestones from './ProjectsMilestones';
import WP_API from '../../data/Api';

class ProjectsContainer extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            companies: JSON.parse(localStorage.getItem('companies')),
            modal: false,
            modalType: '',
            singleProjectData: {},
            offset: 0,
            totalRecords: 0,
            currentProject: '',
            loading: true
        };
    }

    // componentWillMount pravi problem?
    componentWillMount() {
        this.getProjects();
    }

    getProjects = () => {
        const cachedProjects = localStorage.getItem('projects');
        const { offset } = this.state;

        if (cachedProjects) {
            const projects = JSON.parse(cachedProjects);
            this.setState(() => ({
                projects,
                totalRecords: projects.length,
                loading: false
            }));
        } else {
            const api = new WP_API();
            api.getPosts('projects', { itemsPerPage: 9999, offset }).then(result => {
                const projectsList = result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    company: post.company_name
                }));
                localStorage.setItem('projects', JSON.stringify(projectsList));
                this.setState(() => ({
                    projects: projectsList,
                    totalRecords: result.count.publish,
                    loading: false
                }));
            });
        }
    };

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
            this.setState({ projectMilestones: milestones, currentProject: id });
        });
    };

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getProjects();
        });
    };

    handleModalClose = updated => {
        this.setState({ modal: false });
        if (updated === true) {
            localStorage.removeItem('projects');
            this.getProjects();
        }
    };

    deleteProject = (e, id) => {
        console.log(`Deleting project with id: ${id}`);
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button--table button--table--edit"
                onClick={e => {
                    this.editProject(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button--table button--table--delete"
                onClick={e => {
                    this.deleteProject(e, id);
                }}
            >
                <FaTrashAlt />
            </button>
            <button
                type="button"
                className="button--table button--table--milestones"
                onClick={e => {
                    this.editMilestones(e, id);
                }}
            >
                <FaFlag />
            </button>
        </React.Fragment>
    );

    render() {
        const {
            projects,
            modal,
            modalType,
            singleProjectData,
            companies,
            totalRecords,
            loading,
            projectMilestones,
            currentProject
        } = this.state;
        const newComp =
            projects &&
            projects.map(value => {
                const newValue = value;
                newValue.btn = this.actionBtns(value.id);
                return newValue;
            });
        const columns = [
            { key: 'id', title: 'ID' },
            { key: 'title', title: 'Title' },
            { key: 'company', title: 'Company' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                <Projects
                    columns={columns}
                    data={newComp}
                    addProject={this.addProject}
                    onPageChanged={this.onPageChanged}
                    totalRecords={totalRecords}
                    loading={loading}
                />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    {modalType === 'project' ? (
                        <ProjectsEdit
                            singleProjectData={singleProjectData}
                            companies={companies}
                            handleModalClose={this.handleModalClose}
                        />
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
        'project_features'
    ],
    itemsPerPage: 20
};

export default ProjectsContainer;
