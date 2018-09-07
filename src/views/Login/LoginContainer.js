import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import WP_AUTH from '../../data/Auth';
import Login from './Login';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            redirectTo: false,
            username: null,
            password: null
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        const auth = new WP_AUTH();
        const { username, password } = this.state;
        auth.authenticate(username, password).then(result => {
            console.log(result);
            if (result === 200) {
                this.setState({ redirectTo: true });
            }
        });
    }

    handleChange(e) {
        console.log(e);
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    render() {
        const { redirectTo } = this.state;
        if (redirectTo) {
            return <Redirect to="/" />;
        }

        return <Login login={this.login} handleChange={this.handleChange} />;
    }
}

export default LoginForm;
