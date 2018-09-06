import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import WP_AUTH from '../data/Auth';

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

        return (
            <div className="row">
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={this.handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-default" onClick={this.login}>
                    Login
                </button>
            </div>
        );
    }
}

export default LoginForm;
