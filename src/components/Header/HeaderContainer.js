import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import WP_AUTH from '../../data/Auth';

class HeaderContainer extends Component {
    constructor() {
        super();
        this.state = {
            redirectTo: false
        };
    }

    logout = () => {
        console.log('ne radi');
        const auth = new WP_AUTH();
        auth.removeSessionToken();
        this.setState({ redirectTo: true });
    };

    render() {
        const { redirectTo } = this.state;
        if (redirectTo) {
            this.setState({ redirectTo: false }); // da zadrzim header, hack, al radim vec 12h i ovo mi prvo palo na pamet :)
            return <Redirect to="/" />;
        }
        return <Header logout={this.logout} />;
    }
}

export default HeaderContainer;
