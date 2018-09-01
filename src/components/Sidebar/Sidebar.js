import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default () => (
    <aside id="sidebar" className="sidebar">
        <h5 className="logo">
            <Link to="/" className="logo__link">
                AM2 Admin Theme
            </Link>
            <span className="logo__subtitle">admin v.2.1.</span>
        </h5>

        <div className="user-box">
            <figure className="user-box__image js-user-box-dropdown-toggle">
                <a href="/">
                    <img
                        className="user-box__img"
                        src="'http://localhost:8080/styles/images/avatar.png"
                        alt=""
                    />
                </a>
            </figure>
            <div className="user-box__text js-user-box-dropdown-toggle">
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

        <nav className="main-navigation nano">
            <Navigation />
        </nav>
    </aside>
);
