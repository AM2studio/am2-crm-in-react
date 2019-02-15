import React from 'react';
import AddTimeEntry from './Widgets/AddTimeEntry';
import AddNote from './Widgets/AddNote';
import AddHighFive from './Widgets/AddHighFive';
import RequestVacation from './Widgets/RequestVacation';
import { SharedDataConsumer } from '../../data/SharedDataContext';

export default () => (
    <SharedDataConsumer>
        {({ users, projects }) => (
            <div className="columns">
                <AddTimeEntry projects={projects} />
                <RequestVacation />
                <AddNote users={users} />
                <AddHighFive users={users} />
            </div>
        )}
    </SharedDataConsumer>
);
