import React from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import ViewWrapper from '../../components/General/ViewWrapper';
import Loading from '../../components/General/Loading';
import 'react-calendar-timeline/lib/Timeline.css';

export default props => {
    const { data, users, loading } = props;
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
};
