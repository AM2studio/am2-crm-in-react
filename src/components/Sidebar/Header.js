import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../styles/images/avatar.png';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            active: false
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

    render() {
        const { title, subtitle } = this.props;
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
                        Administrator
                        <svg className="svg-icon svg-icon--small user-box__toggle-icon" />
                    </div>
                    <ul className="user-box__dropdown">
                        <li className="user-box__dropdown-item">
                            <a href="/" className="user-box__dropdown-item-anchor">
                                <svg className="svg-icon svg-icon--small">
                                    <use xlinkHref="../static/images/sprite.svg#icon--user" />
                                </svg>
                                Profile
                            </a>
                        </li>
                        <li className="user-box__dropdown-item">
                            <a href="/" className="user-box__dropdown-item-anchor">
                                <svg className="svg-icon svg-icon--small">
                                    <use xlinkHref="../static/images/sprite.svg#icon--logout" />
                                </svg>
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;
