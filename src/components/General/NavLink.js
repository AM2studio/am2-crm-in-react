import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavLink extends Component {
    render() {
        const { active, to, href, parentClass, linkClass, children } = this.props;
        return active ? (
            <li className={parentClass}>
                {to ? (
                    <Link to={to} className={linkClass}>
                        {children}
                    </Link>
                ) : (
                    <a href={href} className={linkClass}>
                        {children}
                    </a>
                )}
            </li>
        ) : (
            ''
        );
    }
}

export default NavLink;
