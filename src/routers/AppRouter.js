import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import Loading from '../views/Loading';
// Importing them directly due to split chunk not importing it in js that is used by some components.
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
const NotFound = lazy(() => import('../views/NotFound'));
const LoginContainer = lazy(() => import('../views/Login/LoginContainer'));
const ProjectsContainer = lazy(() => import('../views/Projects/ProjectsContainer'));
const CompaniesContainer = lazy(() => import('../views/Companies/CompaniesContainer'));
const UsersContainer = lazy(() => import('../views/Users/UsersContainer'));
const NotesContainer = lazy(() => import('../views/Notes/NotesContainer'));
const TimelineContainer = lazy(() => import('../views/Timeline/TimelineContainer'));
const VacationsContainer = lazy(() => import('../views/Vacations/VacationsContainer'));
const VacationsRequestsContainer = lazy(() => import('../views/VacationRequests/VacationRequestsContainer'));
const TimeEntriesContainer = lazy(() => import('../views/TimeEntries/TimeEntriesContainer'));
const ProjectEarningsContainer = lazy(() => import('../views/ProjectEarnings/ProjectEarningsContainer'));
const ProjectReportsContainer = lazy(() => import('../views/ProjectReports/ProjectReportsContainer'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const PublicRoute = lazy(() => import('./PublicRoute'));

const Routes = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <PrivateRoute path="/" component={Dashboard} exact />
            <PrivateRoute path="/timeentries" component={TimeEntriesContainer} />
            <PrivateRoute path="/projects" component={ProjectsContainer} />
            <PrivateRoute path="/companies" component={CompaniesContainer} />
            <PrivateRoute path="/users" component={UsersContainer} />
            <PrivateRoute path="/notes" component={NotesContainer} />
            <PrivateRoute path="/timeline" component={TimelineContainer} />
            <PrivateRoute path="/vacations" component={VacationsContainer} />
            <PrivateRoute path="/vacationrequests" component={VacationsRequestsContainer} />
            <PrivateRoute path="/projectearnings" component={ProjectEarningsContainer} />
            <PrivateRoute path="/projectreports" component={ProjectReportsContainer} />
            <PublicRoute path="/login" component={LoginContainer} />
            <PublicRoute component={NotFound} />
        </Switch>
    </Suspense>
);

export default Routes;
