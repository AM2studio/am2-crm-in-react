import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../styles/images/avatar.png';
import WP_AUTH from '../../data/Auth';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
            redirectTo: false
        };
    }

    componentDidUpdate() {
        const { active } = this.state;
        document.body.className = '';
        if (active) {
            document.body.className = 'user-box--active';
        }
    }

    toggleMenu = () => {
        const { active } = this.state;
        this.setState({
            active: !active
        });
    };

    logout = () => {
        const auth = new WP_AUTH();
        auth.removeSessionToken();
        this.setState({ redirectTo: true });
    };

    render() {
        const { title, subtitle } = this.props;
        const { redirectTo } = this.state;
        if (redirectTo) {
            this.setState({ redirectTo: false }); // da zadrzim header, hack, al radim vec 12h i ovo mi prvo palo na pamet :)
            return <Redirect to="/" />;
        }
        return (
            <React.Fragment>
                <h5 className="logo">
                    <Link to="/" className="logo__link">
                        {title}
                    </Link>
                    <span className="logo__subtitle">{subtitle}</span>
                </h5>
                <div className="user-box">
                    <figure className="user-box__image js-user-box-dropdown-toggle">
                        <a href="/">
                            <img
                                className="user-box__img"
                                src={logo}
                                alt=""
                                width="400"
                                height="500"
                            />
                        </a>
                    </figure>
                    <div
                        role="button"
                        className="user-box__text js-user-box-dropdown-toggle"
                        onClick={this.toggleMenu}
                        onKeyPress={this.toggleMenu}
                        tabIndex="0"
                    >
                        {sessionStorage.getItem('crmUserName')}
                        <svg className="svg-icon svg-icon--small user-box__toggle-icon" />
                    </div>
                    <ul className="user-box__dropdown">
                        <li className="user-box__dropdown-item">
                            <a href="/" className="user-box__dropdown-item-anchor">
                                Profile
                            </a>
                        </li>
                        <li className="user-box__dropdown-item">
                            <button
                                type="button"
                                onClick={this.logout}
                                className="user-box__dropdown-item-anchor"
                            >
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;
