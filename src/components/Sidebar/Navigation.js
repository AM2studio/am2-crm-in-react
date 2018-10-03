import React from 'react';
import { withRouter } from 'react-router-dom';
import WP_AUTH from '../../data/Auth';
import NavLink from '../General/NavLink';

const activeClass = (path, link) => {
    if (path === link) {
        return true;
    }
    return false;
};

const Navigation = props => {
    const auth = new WP_AUTH();
    const permissions = auth.getPermissions();
    const { location } = props;

    const links = [
        {
            to: '/',
            parentClass: activeClass(location.pathname, '/')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: true,
            title: 'Dashboard'
        },
        {
            to: '/users',
            parentClass: activeClass(location.pathname, '/users')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('users'),
            title: 'Users'
        },
        {
            to: '/companies',
            parentClass: activeClass(location.pathname, '/companies')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('companies'),
            title: 'Companies'
        },
        {
            to: '/projects',
            parentClass: activeClass(location.pathname, '/projects')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('projects'),
            title: 'Projects'
        },
        {
            to: '/notes',
            parentClass: activeClass(location.pathname, '/notes')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('userNotes'),
            title: 'Notes'
        },
        {
            to: '/vacations',
            parentClass: activeClass(location.pathname, '/vacations')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('vacations'),
            title: 'Vacations'
        }
    ];
    return (
        <ul className="menu menu--main nano-content">
            {links.map(link => {
                const { title, ...rest } = link;
                return (
                    <NavLink key={title} linkClass="menu__link effect effect--waves" {...rest}>
                        {title}
                    </NavLink>
                );
            })}
        </ul>
    );
};

export default withRouter(Navigation);
