import React, { Component } from 'react';
import Users from './Users';
import AM2Modal from '../../components/General/AM2Modal';
import UsersEdit from './UsersEdit';
import WP_API from '../../data/Api';

class UsersContainer extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            modal: false,
            singleUserData: {}
        };
    }

    componentWillMount() {
        const cachedUsers = localStorage.getItem('users');
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
                this.setData(posts);
            });
        }
    }

    setData = data => {
        localStorage.setItem('users', JSON.stringify(data));
        this.setState({ users: data });
    };

    updateLocalDataAFterEdit = (type, id, title, city) => {
        const { users } = this.state;
        let updatedUsers = users;
        if (type === 'edit') {
            updatedUsers = users.map(user => (user.id === id ? { ...user, title, city } : user));
        } else {
            updatedUsers = [
                {
                    id,
                    title,
                    city
                }
            ].concat(users);
        }

        this.setState({ users: updatedUsers });
    };

    addUser = () => {
        this.setState(() => ({
            modal: true,
            singleUserData: false
        }));
    };

    editUser = (e, id) => {
        console.log(`Editing user with id: ${id}`);
        const dataToFetch = [
            'id',
            'title',
            'address',
            'city',
            'contact_email',
            'country',
            'province',
            'phone',
            'zip',
            'website'
        ];
        const data = new WP_API();
        data.getPost('users', id, dataToFetch);
        data.get().then(result => {
            this.setState(() => ({
                modal: true,
                singleUserData: result
            }));
        });
    };

    handleModalClose = () => {
        this.setState({ modal: false });
    };

    deleteUser = (e, id) => {
        console.log(`Deleting user with id: ${id}`);
    };

    filterRole = role => {
        switch (role) {
            case 'back_end_developer':
                return 'Back End Developer';
            case 'front_end_developer':
                return 'Front End Developer';
            case 'designer':
                return 'Designer';
            case 'pm':
                return 'Project Manager';
            default:
                return 'Missing';
        }
    };

    filterDepartment = department => {
        if (department === '') {
            return 'Not assigned';
        }
        const dep = department.join(', ');
        return dep
            .replace('wp', 'WordPress')
            .replace('greenrush', 'GreenRush')
            .replace('ticketzone', 'TicketZone')
            .replace('pm', 'PM')
            .replace('laravel', 'Laravel');
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button button--primary button--small button--bold"
                onClick={e => {
                    this.editUser(e, id);
                }}
            >
                Edit
            </button>
            <button
                type="button"
                className="button button--danger button--small button--bold"
                onClick={e => {
                    this.deleteUser(e, id);
                }}
            >
                Delete
            </button>
        </React.Fragment>
    );

    render() {
        const { users, modal, singleUserData } = this.state;

        const filteredData = users.map(user => {
            const filteredUser = user;
            filteredUser.btn = this.actionBtns(user.id);
            filteredUser.company_role = this.filterRole(user.company_role);
            filteredUser.department = this.filterDepartment(user.department);
            filteredUser.email = <a href={`mailto:${user.email}`}>{user.email}</a>;
            return filteredUser;
        });
        const columns = [
            { key: 'first_name', title: 'First Name' },
            { key: 'last_name', title: 'Last Name' },
            { key: 'email', title: 'Email' },
            { key: 'company_role', title: 'Company Role' },
            { key: 'department', title: 'Department' },
            //            { key: 'role', title: 'Role' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                <Users columns={columns} data={filteredData} addUser={this.addUser} />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <UsersEdit
                        singleUserData={singleUserData}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
                        updateLocalDataAFterEdit={this.updateLocalDataAFterEdit}
                    />
                </AM2Modal>
            </React.Fragment>
        );
    }
}

export default UsersContainer;
