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
import VacationsRequestsContainer from '../views/VacationRequests/VacationRequestsContainer';
import TimeEntriesContainer from '../views/TimeEntries/TimeEntriesContainer';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes = () => (
    <Switch>
        <PrivateRoute path="/" component={Dashboard} exact />
        <PrivateRoute path="/timeentries" component={TimeEntriesContainer} />
        <PrivateRoute path="/projects" component={ProjectsContainer} />
        <PrivateRoute path="/companies" component={CompaniesContainer} />
        <PrivateRoute path="/users" component={UsersContainer} />
        <PrivateRoute path="/notes" component={NotesContainer} />
        <PrivateRoute path="/vacations" component={VacationsContainer} />
        <PrivateRoute path="/vacationrequests" component={VacationsRequestsContainer} />
        <PublicRoute path="/login" component={LoginContainer} />
        <PublicRoute component={NotFound} />
    </Switch>
);

export default Routes;
