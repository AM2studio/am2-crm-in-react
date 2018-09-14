import React from 'react';
import { Switch } from 'react-router-dom';
import NotFound from '../views/NotFound';
import Dashboard from '../views/Dashboard/Dashboard';
import LoginContainer from '../views/Login/LoginContainer';
import ProjectsContainer from '../views/Projects/ProjectsContainer';
import CompaniesContainer from '../views/Companies/CompaniesContainer';
import UsersContainer from '../views/Users/UsersContainer';
import NotesContainer from '../views/Notes/NotesContainer';
import VacationsContainer from '../views/Vacations/VacationsContainer';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes = () => (
    <Switch>
        <PrivateRoute path="/" component={Dashboard} exact />
        <PrivateRoute path="/projects" component={ProjectsContainer} />
        <PrivateRoute path="/companies" component={CompaniesContainer} />
        <PrivateRoute path="/users" component={UsersContainer} />
        <PrivateRoute path="/notes" component={NotesContainer} />
        <PrivateRoute path="/vacations" component={VacationsContainer} />
        <PublicRoute path="/login" component={LoginContainer} />
        <PublicRoute component={NotFound} />
    </Switch>
);

export default Routes;
