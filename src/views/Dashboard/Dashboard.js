import React, { Component } from 'react';
import AddTimeEntry from './Widgets/AddTimeEntry';
import AddNote from './Widgets/AddNote';
import AddHighFive from './Widgets/AddHighFive';
import RequestVacation from './Widgets/RequestVacation';
import WP_API from '../../data/Api';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            users: []
        };
    }

    componentDidMount() {
        const cachedCompanies = localStorage.getItem('companies');
        const cachedProjects = localStorage.getItem('projects');
        const cachedUsers = localStorage.getItem('users');
        // Get Companies
        if (!cachedCompanies) {
            const api = new WP_API();
            api.getPosts('companies').then(result => {
                const posts = result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    city: post.city
                }));
                localStorage.setItem('companies', JSON.stringify(posts));
            });
        }
        // Get Users
        if (cachedUsers) {
            this.setState({ users: JSON.parse(cachedUsers) });
        } else {
            const api = new WP_API();
            api.getPosts('users').then(result => {
                const posts = result.data.map(post => ({
                    id: post.id,
                    first_name: post.first_name,
                    last_name: post.last_name,
                    company_role: post.company_role,
                    department: post.department,
                    email: post.email,
                    role: post.role
                }));
                localStorage.setItem('users', JSON.stringify(posts));
                this.setState({ users: posts });
            });
        }
        // Get Projects
        if (cachedProjects) {
            this.setState({ projects: JSON.parse(cachedProjects) });
        } else {
            const api = new WP_API();
            api.getPosts('projects').then(result => {
                const posts = result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    company: post.company_name
                }));
                localStorage.setItem('projects', JSON.stringify(posts));
                this.setState({ projects: posts });
            });
        }
    }

    render() {
        const { users, projects } = this.state;
        return (
            <React.Fragment>
                <AddTimeEntry projects={projects} />
                <RequestVacation />
                <AddNote users={users} />
                <AddHighFive users={users} />
            </React.Fragment>
        );
    }
}
export default Dashboard;
