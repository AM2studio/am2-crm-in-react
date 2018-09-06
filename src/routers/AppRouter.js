import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../views/NotFound';
import Dashboard from '../views/Dashboard';
import ProjectsContainer from '../views/Projects/ProjectsContainer';
import CompaniesContainer from '../views/Companies/CompaniesContainer';
import Login from '../views/Login';
import Users from '../views/Users';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
    <Switch>
        <PrivateRoute path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/projects" component={ProjectsContainer} />
        <PrivateRoute path="/companies" component={CompaniesContainer} />
        <PrivateRoute path="/users" component={Users} />
        <Route component={NotFound} />
    </Switch>
);

export default Routes;
