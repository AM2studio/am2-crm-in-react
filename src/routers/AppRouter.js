import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../views/NotFound';
import Dashboard from '../views/Dashboard';
import Projects from '../views/Projects';
import Users from '../views/Users';

const Routes = () => (
    <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/projects" component={Projects} />
        <Route path="/users" component={Users} />
        <Route component={NotFound} />
    </Switch>
);

export default Routes;
