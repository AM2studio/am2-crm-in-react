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
        // Get Users
        this.getUsers();
        // Get Projects
        this.getProjects();
        // Get Companies
        this.getCompanies();
    }

    getUsers = () => {
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
    };

    getProjects = (byPassCache = false) => {
        api.getPosts('projects', null, byPassCache).then(result => {
            const posts = result.data.map(post => ({
                id: post.id,
                title: post.title,
                company: post.company_name
            }));
            this.setState({ projects: posts });
        });
    };

    getCompanies = (byPassCache = false) => {
        api.getPosts('companies', null, byPassCache).then(result => {
            const posts = result.data.map(post => ({
                id: post.id,
                title: post.title,
                city: post.city
            }));
            this.setState({
                companies: posts
            });
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
                    getCompanies: this.getCompanies,
                    getProjects: this.getProjects,
                    getUsers: this.getUsers
                }}
            >
                {children}
            </Provider>
        );
    }
}

export const SharedDataConsumer = Consumer;
