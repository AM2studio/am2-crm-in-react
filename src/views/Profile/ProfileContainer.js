import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Select from '../../components/Form/Select';
import Profile from './Profile';
import WP_API from '../../data/Api';

const data = new WP_API();

class ProjectsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    componentWillMount() {
        this.getProfileData();
    }

    updateProfileData = () => {
        data.set('profile', null, this.state).then(result => {
            if (result.success === true) {
                this.getProfileData();
            } else {
                console.log('Something went wrong!');
            }
        });
    };

    getProfileData = () => {
        data.getPosts('profile', {}, true, true).then(result => {
            this.setState({
                loading: false,
                ...result.data
            });
        });
    };

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            loading,
            first_name, // eslint-disable-line camelcase
            last_name, // eslint-disable-line camelcase
            email,
            toggl_api, // eslint-disable-line camelcase
            workspace,
            workspaces // eslint-disable-line camelcase
        } = this.state;

        const fields = [
            {
                type: Text,
                name: 'first_name',
                label: 'First Name',
                required: true,
                value: first_name
            },
            {
                type: Text,
                name: 'last_name',
                label: 'Last Name',
                required: true,
                value: last_name
            },
            {
                type: Text,
                name: 'email',
                label: 'Email',
                required: true,
                value: email
            },
            {
                type: Text,
                name: 'toggl_api',
                label: 'Toggl API Token',
                required: true,
                value: toggl_api
            },
            {
                type: Select,
                name: 'workspace',
                label: 'Toggl Workspace',
                required: true,
                value: workspace,
                list: workspaces
            }
        ];
        return (
            <Profile
                fields={fields}
                loading={loading}
                inputChangeEvent={this.inputChangeEvent}
                updateProfileData={this.updateProfileData}
            />
        );
    }
}

export default ProjectsEdit;
