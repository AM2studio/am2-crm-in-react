import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
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
            singleUserData: {},
            offset: 0,
            totalRecords: 0,
            loading: true
        };
    }

    componentWillMount() {
        this.getUsers();
    }

    getUsers = () => {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const cachedUsers = localStorage.getItem('users');
        if (cachedUsers) {
            const users = JSON.parse(cachedUsers);
            this.setState(() => ({
                users: users.slice(offset, offset + itemsPerPage),
                totalRecords: users.length,
                loading: false
            }));
        } else {
            const users = new WP_API();
            users.getPosts('users', { itemsPerPage: 9999, offset }).then(result => {
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
                this.setState({
                    users: posts,
                    totalRecords: result.count,
                    loading: false
                });
            });
        }
    };

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getUsers();
        });
    };

    addUser = () => {
        this.setState(() => ({
            modal: true,
            singleUserData: false
        }));
    };

    editUser = (e, id) => {
        this.setState({ modal: true });
        const dataToFetch = [
            'id',
            'first_name',
            'last_name',
            'email',
            'department',
            'country',
            'company_role',
            'track_resources',
            'hourly_rate',
            'daily_workable_hours',
            'do_not_track_workable_hours',
            'am2Permissions'
        ];
        const data = new WP_API();
        data.get('users', id, dataToFetch).then(result => {
            this.setState({ singleUserData: result });
        });
    };

    handleModalClose = updated => {
        this.setState({ modal: false });
        if (updated === true) {
            localStorage.removeItem('users');
            this.getUsers();
        }
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
                className="button--table button--table--edit"
                onClick={e => {
                    this.editUser(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button--table button--table--delete"
                onClick={e => {
                    this.deleteUser(e, id);
                }}
            >
                <FaTrashAlt />
            </button>
        </React.Fragment>
    );

    render() {
        const { users, modal, singleUserData, totalRecords, loading } = this.state;
        const { itemsPerPage } = this.props;

        const filteredData = users.map(user => ({
            ...user,
            btn: this.actionBtns(user.id),
            company_role: this.filterRole(user.company_role),
            department: this.filterDepartment(user.department),
            email: <a href={`mailto:${user.email}`}>{user.email}</a>
        }));
        const columns = [
            { key: 'first_name', title: 'First Name' },
            { key: 'last_name', title: 'Last Name' },
            { key: 'email', title: 'Email' },
            { key: 'company_role', title: 'Company Role' },
            { key: 'department', title: 'Department' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                <Users
                    columns={columns}
                    data={filteredData}
                    addUser={this.addUser}
                    onPageChanged={this.onPageChanged}
                    totalRecords={totalRecords}
                    loading={loading}
                    itemsPerPage={itemsPerPage}
                />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <UsersEdit
                        singleUserData={singleUserData}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
                    />
                </AM2Modal>
            </React.Fragment>
        );
    }
}

export default UsersContainer;

UsersContainer.defaultProps = {
    itemsPerPage: 20
};
