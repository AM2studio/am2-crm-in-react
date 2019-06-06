import React, { Component } from 'react';
import WP_API from './Api';

const { Consumer, Provider } = React.createContext();
const api = new WP_API();

export default class DataProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            users: [],
            companies: []
        };
    }

    componentDidMount() {
        // Fetch Data
        Promise.all([this.getUsers(), this.getProjects(), this.getCompanies()]).then(result => {
            this.setState({ users: result[0], projects: result[1], companies: result[2] });
        });
    }

    getProjects = (byPassCache = false) =>
        api.getPosts('projects', null, byPassCache).then(result =>
            result.data.map(post => ({
                id: post.id,
                title: post.title,
                toggl: post.toggl,
                company: post.company_name
            }))
        );

    getCompanies = (byPassCache = false) =>
        api.getPosts('companies', null, byPassCache).then(result =>
            result.data.map(post => ({
                id: post.id,
                title: post.title,
                city: post.city
            }))
        );

    getUsers = () =>
        api.getPosts('users').then(result =>
            result.data.map(post => ({
                id: post.id,
                first_name: post.first_name,
                last_name: post.last_name,
                title: `${post.first_name} ${post.last_name}`,
                company_role: post.company_role,
                department: post.department,
                email: post.email,
                role: post.role
            }))
        );

    refreshProjects = byPassCache => {
        this.getProjects(byPassCache).then(projects => {
            this.setState({ projects });
        });
    };

    refreshCompanies = byPassCache => {
        this.getCompanies(byPassCache).then(companies => {
            this.setState({ companies });
        });
    };

    refreshUsers = () => {
        this.getUsers().then(users => {
            this.setState({ users });
        });
    };

    render() {
        const { children } = this.props;
        const { projects, users, companies } = this.state;
        console.log('glavni render');
        return (
            <Provider
                value={{
                    projects,
                    users,
                    companies,
                    refreshCompanies: this.refreshCompanies,
                    refreshProjects: this.refreshProjects,
                    refreshUsers: this.refreshUsers
                }}
            >
                {children}
            </Provider>
        );
    }
}

export const SharedDataConsumer = Consumer;
