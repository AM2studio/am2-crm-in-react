import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, path, exact }) => (
    <Route path={path} exact={exact} render={() => <Component />} />
);

export default PublicRoute;
