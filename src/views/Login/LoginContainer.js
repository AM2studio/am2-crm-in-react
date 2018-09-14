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
            password: null,
            loader: false
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        this.setState(() => ({ loader: true }));
        const auth = new WP_AUTH();
        const { username, password } = this.state;
        auth.authenticate(username, password).then(result => {
            if (result === 200) {
                this.setState({ redirectTo: true });
            }
            this.setState({ loader: false });
        });
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    render() {
        const { redirectTo, loader } = this.state;
        if (redirectTo) {
            return <Redirect to="/" />;
        }

        return <Login login={this.login} handleChange={this.handleChange} loader={loader} />;
    }
}

export default LoginForm;
