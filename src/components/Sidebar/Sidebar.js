import React from 'react';

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
                    <a href="dashboard.html" className="menu__link effect effect--waves">
                        Dashboard
                    </a>
                </li>
                <li className="menu__item ">
                    <a href="/" className="menu__link menu__item--toggle effect effect--waves">
                        <span className="menu__item-label">UI Elements</span>
                        <span className="menu__item-toggle-button">
                            <svg className="svg-arrow--left-dims">
                                <use xlinkHref="../static/images/sprite.svg#arrow--left" />
                            </svg>
                        </span>
                    </a>
                    <ul className="menu menu--submenu">
                        <li className="menu__item ">
                            <a href="typography.html" className="menu__link effect effect--waves">
                                Typography
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="colors.html" className="menu__link effect effect--waves">
                                Colors
                            </a>
                        </li>
                        <li className="menu__item  ">
                            <a href="grid.html" className="menu__link effect effect--waves">
                                Grid
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="sections.html" className="menu__link effect effect--waves">
                                Sections
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="buttons.html" className="menu__link effect effect--waves">
                                Buttons
                            </a>
                        </li>
                        <li className="menu__item toggle-button ">
                            <a
                                href="notifications.html"
                                className="menu__link effect effect--waves"
                            >
                                Notifications
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="elements.html" className="menu__link effect effect--waves">
                                Elements
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="svg-icons.html" className="menu__link effect effect--waves">
                                SVG Icons
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="tabs.html" className="menu__link effect effect--waves">
                                Tabs
                            </a>
                        </li>
                        <li className="menu__item ">
                            <a href="accordions.html" className="menu__link effect effect--waves">
                                Accordions
                            </a>
                        </li>
                        <li className="menu__item toggle-button ">
                            <a href="modals.html" className="menu__link effect effect--waves">
                                Modals
                            </a>
                        </li>
                    </ul>
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
                <li className="menu__item ">
                    <a href="charts.html" className="menu__link effect effect--waves">
                        Charts
                    </a>
                </li>
                <li className="menu__item ">
                    <a href="/" className="menu__link menu__item--toggle effect effect--waves">
                        <span className="menu__item-label">Materialize</span>
                        <span className="menu__item-toggle-button">
                            <svg className="svg-arrow--left-dims">
                                <use xlinkHref="../static/images/sprite.svg#arrow--left" />
                            </svg>
                        </span>
                    </a>
                    <ul className="menu menu--submenu">
                        <li className="menu__item toggle-button ">
                            <a
                                href="materialize-forms.html"
                                className="menu__link effect effect--waves"
                            >
                                Materialize Forms
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="menu__item ">
                    <a href="/" className="menu__link menu__item--toggle effect effect--waves">
                        <span className="menu__item-label">Tables</span>
                        <span className="menu__item-toggle-button">
                            <svg className="svg-arrow--left-dims">
                                <use xlinkHref="../static/images/sprite.svg#arrow--left" />
                            </svg>
                        </span>
                    </a>
                    <ul className="menu menu--submenu">
                        <li className="menu__item toggle-button ">
                            <a href="tables.html" className="menu__link effect effect--waves">
                                Tables
                            </a>
                        </li>
                        <li className="menu__item toggle-button ">
                            <a href="data-tables.html" className="menu__link effect effect--waves">
                                Data Tables
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="menu__item ">
                    <a href="maps.html" className="menu__link effect effect--waves">
                        Maps
                    </a>
                </li>
                <li className="menu__item ">
                    <a href="effects.html" className="menu__link effect effect--waves">
                        Effects
                    </a>
                </li>
                <li className="menu__item ">
                    <a href="editor.html" className="menu__link effect effect--waves">
                        Editor
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
);
