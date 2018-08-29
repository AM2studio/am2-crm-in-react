import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../views/NotFound';
import Dashboard from '../views/Dashboard';

const Routes = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Dashboard} exact />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;
