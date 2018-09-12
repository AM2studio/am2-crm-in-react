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
            companies: JSON.parse(localStorage.getItem('companies')),
            modal: false,
            singleProjectData: {}
        };
    }

    componentWillMount() {
        // Skip catching until redux
        this.getProjects();
    }

    getProjects = () => {
        const cachedProjects = localStorage.getItem('projects');
        if (cachedProjects) {
            this.setState({ projects: JSON.parse(cachedProjects) });
        } else {
            const api = new WP_API();
            api.getAllPosts('projects').then(result => {
                const projectsList = result.map(post => ({
                    id: post.id,
                    title: post.title,
                    company: post.company_name
                }));
                localStorage.setItem('projects', JSON.stringify(projectsList));
                this.setState(() => ({ projects: projectsList }));
            });
        }
    };

    addProject = () => {
        this.setState(() => ({
            modal: true,
            singleProjectData: false
        }));
    };

    editProject = (e, id) => {
        console.log(`Editing project with id: ${id}`);
        const { dataToFetch } = this.props;
        const data = new WP_API();
        data.getPost('projects', id, dataToFetch);
        data.get().then(result => {
            this.setState(() => ({
                modal: true,
                singleProjectData: result
            }));
        });
    };

    handleModalClose = updated => {
        this.setState({ modal: false });
        if (updated === true) {
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
                <Projects columns={columns} data={newComp} addProject={this.addProject} />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <ProjectsEdit
                        singleProjectData={singleProjectData}
                        companies={companies}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
                    />
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
    ]
};

export default ProjectsContainer;
