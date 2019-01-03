import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    FiBarChart2,
    FiPaperclip,
    FiClock,
    FiUsers,
    FiDollarSign,
    FiFolder,
    FiBarChart,
    // FiCalendar,
    FiHome,
    FiFileText,
    FiCheckCircle,
    FiSun
} from 'react-icons/fi';

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
            parentClass: activeClass(location.pathname, '/') ? 'menu__item menu__item--active' : 'menu__item',
            active: true,
            title: 'Dashboard',
            icon: FiHome
        },
        {
            to: '/timeentries',
            parentClass: activeClass(location.pathname, '/timeentries')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: true,
            title: 'Time Entries',
            icon: FiClock
        },
        {
            to: '/users',
            parentClass: activeClass(location.pathname, '/users') ? 'menu__item menu__item--active' : 'menu__item',
            active: !!permissions.includes('users'),
            title: 'Users',
            icon: FiUsers
        },
        {
            to: '/companies',
            parentClass: activeClass(location.pathname, '/companies') ? 'menu__item menu__item--active' : 'menu__item',
            active: !!permissions.includes('companies'),
            title: 'Companies',
            icon: FiFolder
        },
        {
            to: '/projects',
            parentClass: activeClass(location.pathname, '/projects') ? 'menu__item menu__item--active' : 'menu__item',
            active: !!permissions.includes('projects'),
            title: 'Projects',
            icon: FiFileText
        },
        {
            to: '/reports',
            parentClass: activeClass(location.pathname, '/reports') ? 'menu__item menu__item--active' : 'menu__item',
            active: true,
            title: 'Reports',
            icon: FiBarChart
        },
        {
            to: '/projectearnings',
            parentClass: activeClass(location.pathname, '/projectearnings')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('projectearnings'),
            title: 'Project Earnings',
            icon: FiDollarSign
        },
        {
            to: '/timeline',
            parentClass: activeClass(location.pathname, '/timeline') ? 'menu__item menu__item--active' : 'menu__item',
            active: !!permissions.includes('timeline'),
            title: 'Timeline',
            icon: FiBarChart2
        },
        {
            to: '/notes',
            parentClass: activeClass(location.pathname, '/notes') ? 'menu__item menu__item--active' : 'menu__item',
            active: !!permissions.includes('user-note'),
            title: 'Notes',
            icon: FiPaperclip
        },
        {
            to: '/vacations',
            parentClass: activeClass(location.pathname, '/vacations') ? 'menu__item menu__item--active' : 'menu__item',
            active: true,
            title: 'Vacations',
            icon: FiSun
        },
        {
            to: '/vacationrequests',
            parentClass: activeClass(location.pathname, '/vacationrequests')
                ? 'menu__item menu__item--active'
                : 'menu__item',
            active: !!permissions.includes('vacations'),
            title: 'Vacation Requests',
            icon: FiCheckCircle
        }
    ];
    return (
        <ul className="menu menu--main nano-content">
            {links.map(link => {
                const { title, ...rest } = link;
                return (
                    <NavLink key={title} linkClass="menu__link effect effect--waves" {...rest}>
                        <link.icon /> <span>{title}</span>
                    </NavLink>
                );
            })}
        </ul>
    );
};

export default withRouter(Navigation);
