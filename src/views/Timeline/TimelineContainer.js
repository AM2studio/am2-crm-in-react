import React, { Component } from 'react';
import Timeline from './Timeline';
import WP_API from '../../data/Api';

export default class Gantt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.users = {
            data: [
                {
                    id: 1,
                    text: 'Task #1',
                    start_date: '03-12-2018',
                    duration: 3,
                    color: '#39B34A'
                },
                { id: 2, text: 'Task #2', start_date: '07-12-2018', duration: 3, parent: 1 }
            ],
            links: [{ id: 1, source: 1, target: 2, type: '0' }]
        };
    }

    componentWillMount() {
        const api = new WP_API();
        api.getPosts('users').then(result => {
            const filteredResult = result.data.map(user => ({
                id: user.id,
                text: user.title,
                start_date: this.getFirstDayOfWeekDate(new Date()),
                duration: 5,
                color: '#39B34A'
            }));
            this.setState({ data: filteredResult });
        });
    }

    getFirstDayOfWeekDate = date => {
        const day = date.getDay() || 7;
        if (day !== 1) date.setHours(-24 * (day - 1));
        return `0${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    onTaskUpdated = (id, type, taskObject = {}) => {
        console.log(id, type, taskObject);
    };

    render() {
        const { data } = this.state;
        return (
            <Timeline
                users={{ data }}
                onTaskUpdated={this.onTaskUpdated}
                onLinkUpdated={this.onLinkUpdated}
            />
        );
    }
}
