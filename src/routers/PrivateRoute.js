import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WP_AUTH from '../data/Auth';

const auth = new WP_AUTH();
console.log(auth.isAuthenticated());
const PrivateRoute = ({ component: Component, path, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            auth.isAuthenticated() ? (
                <Component />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
