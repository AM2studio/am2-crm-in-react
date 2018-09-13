import React, { Component } from 'react';
import AddTime from './Widgets/AddTime';
import AddNote from './Widgets/AddNote';
import AddHighFive from './Widgets/AddHighFive';
import RequestVacation from './Widgets/RequestVacation';
import WP_API from '../../data/Api';
// import WP_AUTH from '../data/Auth';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            projects: [],
            users: []
        };

        const { companies, projects } = this.state;
        console.log(companies, projects);
    }

    componentDidMount() {
        const cachedCompanies = localStorage.getItem('companies');
        const cachedProjects = localStorage.getItem('projects');
        const cachedUsers = localStorage.getItem('users');
        // Get Companies
        if (cachedCompanies) {
            this.setState({ companies: JSON.parse(cachedCompanies) });
        } else {
            const api = new WP_API();
            api.getAllPosts('companies').then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title,
                    city: post.city
                }));
                localStorage.setItem('companies', JSON.stringify(posts));
                this.setState(() => ({ companies: posts }));
            });
        }
        // Get Users
        if (cachedUsers) {
            this.setState({ users: JSON.parse(cachedUsers) });
        } else {
            const api = new WP_API();
            api.getAllPosts('users').then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    first_name: post.first_name,
                    last_name: post.last_name,
                    company_role: post.company_role,
                    department: post.department,
                    email: post.email,
                    role: post.role
                }));
                localStorage.setItem('users', JSON.stringify(posts));
                this.setState(() => ({ users: posts }));
            });
        }
        // Get Projects
        if (cachedProjects) {
            this.setState({ projects: JSON.parse(cachedProjects) });
        } else {
            const api = new WP_API();
            api.getAllPosts('projects').then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title,
                    company: post.company_name
                }));
                localStorage.setItem('projects', JSON.stringify(posts));
                this.setState(() => ({ projects: posts }));
            });
        }
    }

    render() {
        const { users } = this.state;
        return (
            <React.Fragment>
                <AddTime />
                <RequestVacation />
                <AddNote users={users} />
                <AddHighFive users={users} />
            </React.Fragment>
        );
    }
}
export default Dashboard;
