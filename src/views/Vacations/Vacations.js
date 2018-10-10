import React, { Component } from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import ViewWrapper from '../../components/General/ViewWrapper';
import Loading from '../../components/General/Loading';
import 'react-calendar-timeline/lib/Timeline.css';

class Vacations extends Component {
    constructor(props) {
        super(props);
        const users = JSON.parse(localStorage.getItem('users')).map(user => ({
            id: user.id,
            title: `${user.first_name} ${user.last_name}`
        }));
        this.state = {
            users
        };
    }

    render() {
        const { data, loading } = this.props;
        const { users } = this.state;

        return (
            <ViewWrapper title="AM2 Vacations">
                {loading ? (
                    <Loading />
                ) : (
                    <Timeline
                        groups={users}
                        items={data}
                        lineHeight="30"
                        canMove="false"
                        defaultTimeStart={moment().startOf('month')}
                        defaultTimeEnd={moment().endOf('month')}
                    />
                )}
            </ViewWrapper>
        );
    }
}

export default Vacations;
