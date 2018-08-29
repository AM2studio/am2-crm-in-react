import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <aside id="sidebar" className="sidebar">
        <h5 className="logo">
            <a href="dashboard.html" className="logo__link">
                AM2 Admin Theme
            </a>
            <span className="logo__subtitle">admin v.2.1.</span>
        </h5>

        <div className="user-box">
            <figure className="user-box__image js-user-box-dropdown-toggle">
                <a href="/">
                    <img className="user-box__img" src="../static/images/avatar.png" alt="" />
                </a>
            </figure>
            <div className="user-box__text js-user-box-dropdown-toggle">
                Administrator
                <svg className="svg-icon svg-icon--small user-box__toggle-icon">
                    <use xlinkHref="../static/images/sprite.svg#icon--play" />
                </svg>
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

        <nav className="main-navigation nano">
            <ul className="menu menu--main nano-content">
                <li className="menu__item  ">
                    <Link to="/" className="menu__link effect effect--waves">
                        Dashboard
                    </Link>
                </li>
                <li className="menu__item  ">
                    <Link to="/users" className="menu__link effect effect--waves">
                        Users
                    </Link>
                </li>
                <li className="menu__item  ">
                    <Link to="/projects" className="menu__link effect effect--waves">
                        Projects
                    </Link>
                </li>
                <li className="menu__item ">
                    <a href="/" className="menu__link menu__item--toggle effect effect--waves">
                        <span className="menu__item-label">Forms</span>
                        <span className="menu__item-toggle-button">
                            <svg className="svg-arrow--left-dims">
                                <use xlinkHref="../static/images/sprite.svg#arrow--left" />
                            </svg>
                        </span>
                    </a>
                    <ul className="menu menu--submenu">
                        <li className="menu__item ">
                            <a href="forms.html" className="menu__link effect effect--waves">
                                Form Elements
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="file-upload.html" className="menu__link effect effect--waves">
                                File Upload
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
);
