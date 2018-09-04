import React, { Component } from 'react';
import WP_API from '../../data/Api';

class Projects extends Component {
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
            projects.getPosts().then(result => {
                const nest = result.map(post => ({
                    id: post.id,
                    title: post.title.rendered
                }));
                this.setData(nest);
            });
        }
    }

    setData = data => {
        const { projects } = this.state;
        const newData = projects.concat(data);
        localStorage.setItem('projects', JSON.stringify(newData));
        this.setState({ projects: newData });
    };

    render() {
        const { projects } = this.state;
        return (
            <table>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Projects;
