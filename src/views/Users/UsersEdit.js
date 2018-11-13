import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Select from '../../components/Form/Select';
import Checkbox from '../../components/Form/Checkbox';
import Radio from '../../components/Form/Radio';
import Loading from '../../components/General/Loading';
import WP_API from '../../data/Api';

class UsersEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading === true) {
            const { singleUserData } = this.props;
            const obj = {};
            // Loop through props object and set as states
            const result = Object.keys(singleUserData).reduce((prev, curr) => {
                obj[curr] = singleUserData[curr];
                return obj;
            }, {});
            this.setState({ ...result, loading: false }); // eslint-disable-line
        }
    }

    updateUserData = () => {
        const { id } = this.state; // eslint-disable-line camelcase
        const { handleModalClose } = this.props;
        const data = new WP_API();
        data.set('users', id, this.state).then(result => {
            if (result.success === true) {
                handleModalClose(true);
            } else {
                console.log('Something went wrong!');
            }
        });
    };

    inputChangeEvent = e => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target;
            this.setState(prevState => {
                let newVal = prevState[name];
                if (!Array.isArray(newVal)) {
                    newVal = [value];
                } else if (checked) {
                    newVal.push(value);
                } else {
                    const index = newVal.indexOf(value);
                    if (index > -1) {
                        newVal.splice(index, 1);
                    }
                }
                return { [name]: newVal };
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    render() {
        const {
            handleModalClose,
            departments,
            countries,
            companyRoles,
            permissionsList,
            trackResources
        } = this.props;

        const {
            loading,
            first_name, // eslint-disable-line camelcase
            last_name, // eslint-disable-line camelcase
            email,
            department,
            country,
            company_role, // eslint-disable-line camelcase
            am2Permissions,
            track_resources, // eslint-disable-line camelcase
            hourly_rate, // eslint-disable-line camelcase
            daily_workable_hours, // eslint-disable-line camelcase,
            do_not_track_workable_hours // eslint-disable-line camelcase
        } = this.state;

        const fields = [
            {
                type: Text,
                name: 'first_name',
                label: 'First Name',
                required: true,
                value: first_name,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Text,
                name: 'last_name',
                label: 'Last Name',
                required: true,
                value: last_name,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Text,
                propType: 'email',
                name: 'email',
                label: 'Email',
                required: true,
                value: email,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Text,
                name: 'hourly_rate',
                label: 'Hourly Rate',
                required: true,
                value: hourly_rate,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Text,
                name: 'daily_workable_hours',
                label: 'Daily Workable Hours',
                required: true,
                value: daily_workable_hours,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Select,
                name: 'country',
                label: 'Country',
                required: true,
                value: country,
                list: countries,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Select,
                name: 'company_role',
                label: 'Company Role',
                required: true,
                value: company_role,
                list: companyRoles,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Radio,
                name: 'track_resources',
                label: 'Track Resources',
                required: true,
                value: track_resources,
                list: trackResources,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Radio,
                name: 'do_not_track_workable_hours',
                label: 'Do not track workable hours',
                required: true,
                value: do_not_track_workable_hours,
                list: trackResources,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Checkbox,
                name: 'department',
                label: 'Department',
                required: true,
                value: department,
                list: departments,
                parentClass: 'form__column col-12',
                className: 'form__input'
            },
            {
                type: Checkbox,
                name: 'am2Permissions',
                label: 'Permissions',
                required: true,
                value: am2Permissions,
                list: permissionsList,
                parentClass: 'form__column col-1',
                className: 'form__input'
            }
        ];
        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit User</h2>
                </header>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="section__content">
                        <form className="form">
                            <div className="form__row">
                                {fields.map(field => {
                                    const { type, name, ...rest } = field; // spread operator
                                    return (
                                        <field.type
                                            key={name}
                                            name={name}
                                            inputChangeEvent={this.inputChangeEvent}
                                            {...rest}
                                        />
                                    );
                                })}
                            </div>
                            <div className="form__row">
                                <button
                                    type="button"
                                    className="button button--primary"
                                    onClick={this.updateUserData}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="button right"
                                    onClick={handleModalClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default UsersEdit;

UsersEdit.defaultProps = {
    countries: [
        { id: 'cro', title: 'Croatia' },
        { id: 'ca', title: 'Canada' },
        { id: 'ba', title: 'Bosnia' },
        { id: 'mk', title: 'Macedonia' }
    ],
    companyRoles: [
        { id: 'front_end_developer', title: 'FrontEnd Developer' },
        { id: 'back_end_developer', title: 'BackEnd Developer' },
        { id: 'designer', title: 'Designer' },
        { id: 'pm', title: 'Project Manager' },
        { id: 'qa', title: 'Quality Assurance' }
    ],
    departments: [
        { id: 'wp', title: 'WordPress' },
        { id: 'ticketzone', title: 'TicketZone' },
        { id: 'greenrush', title: 'GreenRush' },
        { id: 'other', title: 'Other' }
    ],
    permissionsList: [
        { id: 'projects', title: 'Projects' },
        { id: 'companies', title: 'Companies' },
        { id: 'users', title: 'Users' },
        { id: 'user-note', title: 'User Notes' },
        { id: 'vacations', title: 'Vacations' },
        { id: 'timeline', title: 'Timeline' },
        { id: 'timeEntries', title: 'Time Entries' },
        { id: 'reports', title: 'Reports' }
    ],
    trackResources: [{ id: 1, title: 'Yes' }, { id: 0, title: 'No' }]
};
