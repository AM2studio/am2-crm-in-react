import React from 'react';
import { FaUser, FaWrench } from 'react-icons/fa';

const Header = props => {
    const companies = 111; // Fix this with redux and array length.
    const projects = 435; // JSON.parse(localStorage.getItem('projects'));
    const { logout, handleMobileMenu } = props;
    return (
        <header id="header" className="header">
            <nav className="navbar is-white" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <button
                        type="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={handleMobileMenu}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </button>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button type="button" className="button is-info">
                                    <span className="icon is-small">
                                        <FaWrench />
                                    </span>
                                    <span>Settings</span>
                                </button>
                                <button type="button" onClick={logout} className="button is-light">
                                    <span className="icon is-small">
                                        <FaUser />
                                    </span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="header__bottom clearfix">
                <div className="header__left">
                    <h1 className="title">AM2Studio CRM</h1>
                </div>
                <div className="header__right">
                    <div className="header__info">
                        <span className="header__info-value">{companies}</span>
                        <span className="header__info-text">
                            Num of.
                            <br />
                            Companies
                        </span>
                    </div>

                    <div className="header__info">
                        <span className="header__info-value">{projects}</span>
                        <span className="header__info-text">
                            Num of. <br />
                            Projects
                        </span>
                    </div>

                    <div className="header__info">
                        <span className="header__info-value">62</span>
                        <span className="header__info-text">
                            AM2Studio <br />
                            Ninjas
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
