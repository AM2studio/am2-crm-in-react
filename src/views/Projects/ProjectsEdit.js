import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Select from '../../components/Form/Select';
import WP_API from '../../data/Api';
import DatePicker from '../../components/Form/DatePicker';

class ProjectsEdit extends Component {
    constructor(props) {
        super(props);
        const obj = {};
        // Loop through props object and set as states
        const result = Object.keys(props.singleProjectData).reduce((prev, curr) => {
            obj[curr] = props.singleProjectData[curr]; // eslint-disable-line no-param-reassign
            return obj;
        }, {});
        this.state = result;
    }

    updateProjectData = () => {
        const { id } = this.state; // eslint-disable-line camelcase
        const { handleModalClose } = this.props;
        const data = new WP_API();

        data.setPost('projects', id, this.state);
        data.set().then(result => {
            if (result.success === true) {
                handleModalClose(true);
            } else {
                console.log('Something went wrong!');
            }
        });
    };

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            handleModalClose,
            companies,
            currencies,
            paymentTypes,
            departments,
            projectMngrs
        } = this.props;

        const {
            title,
            total_price, // eslint-disable-line camelcase
            quoted_hours, // eslint-disable-line camelcase
            completion_rate, // eslint-disable-line camelcase
            hourly_rate, // eslint-disable-line camelcase
            department_id, // eslint-disable-line camelcase
            start_date, // eslint-disable-line camelcase
            end_date, // eslint-disable-line camelcase
            rep_link, // eslint-disable-line camelcase
            staging_link, // eslint-disable-line camelcase
            slack_channel, // eslint-disable-line camelcase
            company_id, // eslint-disable-line camelcase
            payment_type, // eslint-disable-line camelcase
            currency,
            project_mngr // eslint-disable-line camelcase
            // active_project,
            // project_features // eslint-disable-line camelcase
        } = this.state;

        const fields = [
            {
                type: Text,
                name: 'title',
                label: 'Project Title',
                required: true,
                value: title,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                propType: 'number',
                name: 'total_price',
                label: 'Total Price',
                required: true,
                value: total_price,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                propType: 'number',
                name: 'quoted_hours',
                label: 'Quoted Hours',
                required: true,
                value: quoted_hours,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                propType: 'number',
                name: 'completion_rate',
                label: 'Completion Rate',
                required: true,
                value: completion_rate,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                propType: 'number',
                name: 'hourly_rate',
                label: 'Hourly Rate',
                required: true,
                value: hourly_rate,
                parentClass: 'form__column col-12'
            },
            {
                type: DatePicker,
                name: 'start_date',
                label: 'Start Date',
                required: true,
                value: start_date,
                parentClass: 'form__column col-12'
            },
            {
                type: DatePicker,
                name: 'end_date',
                label: 'End Date',
                required: true,
                value: end_date,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                name: 'rep_link',
                label: 'Repository Link',
                required: true,
                value: rep_link,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                name: 'staging_link',
                label: 'Staging Link',
                required: true,
                value: staging_link,
                parentClass: 'form__column col-12'
            },
            {
                type: Text,
                name: 'slack_channel',
                label: 'Slack Channel',
                required: true,
                value: slack_channel,
                parentClass: 'form__column col-12'
            },
            {
                type: Select,
                name: 'company_id',
                label: 'Company',
                list: companies,
                required: true,
                value: company_id,
                parentClass: 'form__column col-12'
            },
            {
                type: Select,
                name: 'payment_type',
                label: 'Slack Channel',
                list: paymentTypes,
                required: true,
                value: payment_type,
                parentClass: 'form__column col-12'
            },
            {
                type: Select,
                name: 'currency',
                label: 'Slack Channel',
                list: currencies,
                required: true,
                value: currency,
                parentClass: 'form__column col-12'
            },
            {
                type: Select,
                name: 'department_id',
                label: 'Department',
                list: departments,
                required: true,
                value: department_id,
                parentClass: 'form__column col-12'
            },
            {
                type: Select,
                name: 'project_mngr',
                label: 'Slack Channel',
                list: projectMngrs,
                required: true,
                value: project_mngr,
                parentClass: 'form__column col-12'
            }
        ];
        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit Project</h2>
                </header>
                <div className="section__content">
                    <form className="form">
                        <div className="form__row">
                            {fields.map(field => (
                                <field.type
                                    label={field.label}
                                    name={field.name}
                                    parentClass={field.parentClass}
                                    email={field.email}
                                    propType={field.propType}
                                    required={field.required}
                                    value={field.value}
                                    list={field.list}
                                    inputChangeEvent={this.inputChangeEvent}
                                />
                            ))}
                        </div>
                        <div className="form__row">
                            <button
                                type="button"
                                className="button button--primary"
                                onClick={this.updateProjectData}
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
            </div>
        );
    }
}

export default ProjectsEdit;

ProjectsEdit.defaultProps = {
    currencies: [
        { id: 'USD', title: 'USD' },
        { id: 'HRK', title: 'HRK' },
        { id: 'AUD', title: 'AUD' },
        { id: 'CAD', title: 'CAD' }
    ],
    paymentTypes: [{ id: 'per_project', title: 'Per project' }, { id: 'hourly', title: 'Hourly' }],
    departments: [
        { id: 2, title: 'WP' },
        { id: 3, title: 'Design' },
        { id: 4, title: 'Enterprise' }
    ],
    projectMngrs: [
        { id: 51, title: 'Brankica Basta' },
        { id: 59, title: 'Lynette Sawyer' },
        { id: 32, title: 'Pero Tolic' },
        { id: 4, title: 'Nikola Latin' }
    ]
};
