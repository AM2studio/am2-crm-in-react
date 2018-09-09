import React, { Component } from 'react';
import Projects from './Projects';
import WP_API from '../../data/Api';

class ProjectsContainer extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        const cachedProjects = localStorage.getItem('projects');
        const url = 'http://crm.am2studio.com/wp-json/wp/v2/projects/';
        if (cachedProjects) {
            this.setState({ projects: JSON.parse(cachedProjects) });
        } else {
            const projects = new WP_API(url);
            projects.getAllPosts().then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title.rendered,
                    city: post.city
                }));
                this.setData(posts);
            });
        }
    }

    setData = data => {
        const { projects } = this.state;
        const newData = projects.concat(data);
        localStorage.setItem('projects', JSON.stringify(newData));
        this.setState({ projects: newData });
    };

    editProject = (e, id) => {
        console.log(`Editing project with id: ${id}`);
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
        const { projects } = this.state;

        const newComp = projects.map(value => {
            const newValue = value;
            newValue.btn = this.actionBtns(value.id);
            return newValue;
        });
        const columns = [
            { key: 'id', title: 'ID' },
            { key: 'title', title: 'Title' },
            { key: 'city', title: 'City' },
            { key: 'btn', title: 'Action' }
        ];
        return <Projects columns={columns} data={newComp} />;
    }
}

export default ProjectsContainer;
