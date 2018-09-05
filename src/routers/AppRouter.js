import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../views/NotFound';
import Dashboard from '../views/Dashboard';
import ProjectsContainer from '../views/Projects/ProjectsContainer';
import CompaniesContainer from '../views/Companies/CompaniesContainer';
import Users from '../views/Users';

const Routes = () => (
    <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/projects" component={ProjectsContainer} />
        <Route path="/companies" component={CompaniesContainer} />
        <Route path="/users" component={Users} />
        <Route component={NotFound} />
    </Switch>
);

export default Routes;
