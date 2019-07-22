import React, { Component } from 'react';
import Select from '../../components/Form/Select';
import ViewWrapper from '../../components/General/ViewWrapper';
import Timeline from './Timeline';
import WP_API from '../../data/Api';

export default class TimelineContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterDepartment: '',
            filterRole: '',
            loading: true
        };
    }

    componentWillMount() {
        this.getTimeline();
    }

    getTimeline = () => {
        const { filterRole, filterDepartment } = this.state;
        const api = new WP_API();
        const users = api.getPosts('users', undefined, true, false).then(result =>
            result.data
                .filter(user => {
                    if (filterRole !== '' && filterDepartment !== '') {
                        return filterRole === user.company_role && user.department.indexOf(filterDepartment) !== -1;
                    }
                    if (filterRole !== '') {
                        return filterRole === user.company_role;
                    }
                    if (filterDepartment !== '') {
                        return user.department.indexOf(filterDepartment) !== -1;
                    }
                    return true;
                })
                .map(user => ({
                    id: user.id,
                    text: user.title,
                    start_date: this.getFirstDayOfWeekDate(new Date()),
                    duration: 5,
                    color: '#39B34A',
                    open: true,
                    readonly: true
                }))
        );
        const tasks = api.getPosts('timeline', null, true, false).then(result => result);
        Promise.all([users, tasks]).then(result => {
            this.setState({ data: [...result[0], ...result[1]] });
        });
    };

    getFirstDayOfWeekDate = date => {
        const day = date.getDay() || 7;
        if (day !== 1) date.setHours(-24 * (day - 1));
        return `0${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    formatSaveDate = date => {
        let day = date.getDate();
        if (day < 10) day = `0${day}`;
        return `${day}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    onTaskUpdated = (id, type, taskObject = {}) => {
        const api = new WP_API();
        let data = {
            taskID: taskObject.id,
            action: type
        };
        if (type !== 'deleted') {
            data = {
                ...data,
                parent: taskObject.parent,
                text: taskObject.text,
                start_date: this.formatSaveDate(taskObject.start_date),
                duration: taskObject.duration
            };
        }
        return api.set('timeline', id, data).then(result => result);
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: true }, () => {
            this.getTimeline();
        });
    };

    render() {
        const { data, filterRole, filterDepartment, loading } = this.state;
        const { companyRoles, departments } = this.props;
        return (
            <ViewWrapper title="Timeline">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <Select
                                name="filterRole"
                                label="Filter by Role:"
                                list={companyRoles}
                                value={filterRole}
                                parentClass="field--medium"
                                inputChangeEvent={this.filterChangeEvent}
                            />
                        </div>
                        <div className="level-item">
                            <Select
                                name="filterDepartment"
                                label="Filter by Department:"
                                list={departments}
                                value={filterDepartment}
                                parentClass="field--medium"
                                inputChangeEvent={this.filterChangeEvent}
                            />
                        </div>
                    </div>
                </nav>
                <Timeline users={{ data }} onTaskUpdated={this.onTaskUpdated} onLinkUpdated={this.onLinkUpdated} />
            </ViewWrapper>
        );
    }
}

TimelineContainer.defaultProps = {
    companyRoles: [
        { id: '', title: 'All Roles' },
        { id: 'front_end_developer', title: 'FrontEnd Developer' },
        { id: 'back_end_developer', title: 'BackEnd Developer' },
        { id: 'designer', title: 'Designer' },
        { id: 'pm', title: 'Project Manager' },
        { id: 'qa', title: 'Quality Assurance' }
    ],
    departments: [
        { id: '', title: 'All Departments' },
        { id: 'enterprise', title: 'Enterprise' },
        { id: 'wp', title: 'WordPress' },
        { id: 'ticketzone', title: 'TicketZone' },
        { id: 'greenrush', title: 'GreenRush' },
        { id: 'other', title: 'Other' }
    ]
};
