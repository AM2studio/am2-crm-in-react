import React from 'react';
import { FaUser, FaWrench } from 'react-icons/fa';

const Header = props => {
    const companies = 111; // Fix this with redux and array length.
    const projects = 435; // JSON.parse(localStorage.getItem('projects'));
    const { logout, handleMobileMenu } = props;
    return (
        <header id="header" className="header">
            <div className="mobile-header">
                <div className="mobile-header__logo">
                    <a href="page/dashboard.html" className="mobile-header__logo-link">
                        <h1>AM2Studio CRM</h1>
                    </a>
                    <span className="mobile-header__logo-subtitle">admin v.1.0</span>
                </div>
                <div className="mobile-header__actions">
                    <button
                        type="button"
                        className="js-sidebar-left-toggle c-hamburger c-hamburger--htx"
                        onClick={handleMobileMenu}
                    >
                        <span>toggle menu</span>
                    </button>
                </div>
            </div>

            <div className="header__top clearfix">
                <ul className="user-menu left">
                    <li className="user-menu__item">
                        <p className="user-menu__link" />
                    </li>
                </ul>
                <ul className="user-menu right">
                    <li className="user-menu__item">
                        <a href="/" className="user-menu__link effect effect--waves">
                            <FaWrench />
                            &nbsp; Settings
                        </a>
                    </li>
                    <li className="user-menu__item">
                        <button type="button" onClick={logout} className="user-menu__link">
                            <FaUser />
                            &nbsp; Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div className="header__bottom clearfix">
                <div className="header__left">
                    <h2 className="header__title">AM2Studio CRM</h2>
                    <p className="header__subtitle">Rewritten in React</p>
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
                        <span className="header__info-value">44</span>
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
