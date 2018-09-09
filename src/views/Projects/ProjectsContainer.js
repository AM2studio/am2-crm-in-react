import React, { Component } from 'react';
import Projects from './Projects';
import AM2Modal from '../../components/General/AM2Modal';
import ProjectsEdit from './ProjectsEdit';
import WP_API from '../../data/Api';

class ProjectsContainer extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            companies: [],
            modal: false,
            singleProjectData: {}
        };
    }

    componentDidMount() {
        const cachedProjects = localStorage.getItem('projects');
        const cachedCompanies = localStorage.getItem('companies');
        if (cachedProjects) {
            this.setState({ projects: JSON.parse(cachedProjects) });
            this.setState({ companies: JSON.parse(cachedCompanies) });
        } else {
            const projects = new WP_API();
            projects.getAllPosts('projects').then(result => {
                const projectsList = result.map(post => ({
                    id: post.id,
                    title: post.title,
                    company: post.company_name
                }));
                this.setData(projectsList, result[0].companies);
            });
        }
    }

    setData = (projects, companies) => {
        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('companies', JSON.stringify(companies));
        this.setState(() => ({ projects, companies }));
    };

    updateLocalDataAFterEdit = (type, id, title, company) => {
        const { projects } = this.state;
        let updatedProjects = projects;
        if (type === 'edit') {
            updatedProjects = projects.map(
                project => (project.id === id ? { ...project, title, company } : project)
            );
        } else {
            updatedProjects = [
                {
                    id,
                    title,
                    company
                }
            ].concat(projects);
        }

        this.setState({ projects: updatedProjects });
    };

    addProject = () => {
        this.setState(() => ({
            modal: true,
            singleProjectData: false
        }));
    };

    editProject = (e, id) => {
        console.log(`Editing project with id: ${id}`);
        const dataToFetch = [
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
        ];
        const data = new WP_API();
        data.getPost('projects', id, dataToFetch);
        data.get().then(result => {
            console.log(result);
            this.setState(() => ({
                modal: true,
                singleProjectData: result
            }));
        });
    };

    handleModalClose = () => {
        this.setState({ modal: false });
    };

    deleteProject = (e, id) => {
        console.log(`Deleting project with id: ${id}`);
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button button--primary button--small button--bold"
                onClick={e => {
                    this.editProject(e, id);
                }}
            >
                Edit
            </button>
            <button
                type="button"
                className="button button--danger button--small button--bold"
                onClick={e => {
                    this.deleteProject(e, id);
                }}
            >
                Delete
            </button>
        </React.Fragment>
    );

    render() {
        const { projects, modal, singleProjectData, companies } = this.state;
        console.log(this.state);
        const newComp = projects.map(value => {
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
                <Projects columns={columns} data={newComp} addProject={this.addProject} />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <ProjectsEdit
                        singleProjectData={singleProjectData}
                        companies={companies}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
                        updateLocalDataAFterEdit={this.updateLocalDataAFterEdit}
                    />
                </AM2Modal>
            </React.Fragment>
        );
    }
}

export default ProjectsContainer;
