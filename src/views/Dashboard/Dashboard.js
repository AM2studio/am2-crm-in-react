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
        // Get Companies
        const api = new WP_API();
        // Get Users
        api.getPosts('users').then(result => {
            const posts = result.data.map(post => ({
                id: post.id,
                first_name: post.first_name,
                last_name: post.last_name,
                title: `${post.first_name} ${post.last_name}`,
                company_role: post.company_role,
                department: post.department,
                email: post.email,
                role: post.role
            }));
            this.setState({ users: posts });
        });

        // Get Projects
        api.getPosts('projects').then(result => {
            const posts = result.data.map(post => ({
                id: post.id,
                title: post.title,
                company: post.company_name
            }));
            this.setState({ projects: posts });
        });

        // Goran: Prebaciti u jedan call sa promise.all
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
