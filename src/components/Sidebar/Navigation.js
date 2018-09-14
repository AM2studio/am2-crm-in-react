import React from 'react';
import { withRouter } from 'react-router-dom';
import NavLink from '../General/NavLink';

const activeClass = (path, link) => {
    if (path === link) {
        return true;
    }
    return false;
};

const Navigation = props => {
    const { location } = props;
    return (
        <ul className="menu menu--main nano-content">
            <NavLink
                to="/"
                parentClass={
                    activeClass(location.pathname, '/')
                        ? 'menu__item menu__item--active'
                        : 'menu__item'
                }
                linkClass="menu__link effect effect--waves"
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/users"
                parentClass={
                    activeClass(location.pathname, '/users')
                        ? 'menu__item menu__item--active'
                        : 'menu__item'
                }
                linkClass="menu__link effect effect--waves"
            >
                Users
            </NavLink>
            <NavLink
                to="/companies"
                parentClass={
                    activeClass(location.pathname, '/companies')
                        ? 'menu__item menu__item--active'
                        : 'menu__item'
                }
                linkClass="menu__link effect effect--waves"
            >
                Companies
            </NavLink>
            <NavLink
                to="/projects"
                parentClass={
                    activeClass(location.pathname, '/projects')
                        ? 'menu__item menu__item--active'
                        : 'menu__item'
                }
                linkClass="menu__link effect effect--waves"
            >
                Projects
            </NavLink>
            <NavLink
                to="/notes"
                parentClass={
                    activeClass(location.pathname, '/notes')
                        ? 'menu__item menu__item--active'
                        : 'menu__item'
                }
                linkClass="menu__link effect effect--waves"
            >
                Notes
            </NavLink>
            <NavLink
                to="/vacations"
                parentClass={
                    activeClass(location.pathname, '/vacations')
                        ? 'menu__item menu__item--active'
                        : 'menu__item'
                }
                linkClass="menu__link effect effect--waves"
            >
                Vacations
            </NavLink>
        </ul>
    );
};

export default withRouter(Navigation);
