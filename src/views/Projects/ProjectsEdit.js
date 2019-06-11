import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Select from '../../components/Form/Select';
import MultiSelect from '../../components/Form/MultiSelect';
import WP_API from '../../data/Api';
import DatePicker from '../../components/Form/DatePicker';
import Radio from '../../components/Form/Radio';
import Loading from '../../components/General/Loading';

const data = new WP_API();

class ProjectsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };

        const { singleProjectData } = props;
        if (singleProjectData === false) {
            this.state = { loading: false };
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading === true) {
            const { singleProjectData } = this.props;
            const obj = {};
            // Loop through props object and set as states
            const result = Object.keys(singleProjectData).reduce((prev, curr) => {
                obj[curr] = singleProjectData[curr];
                return obj;
            }, {});
            this.setState({ ...result, loading: false }); // eslint-disable-line
        }
    }

    updateProjectData = () => {
        const { id } = this.state; // eslint-disable-line camelcase
        const { handleModalClose } = this.props;
        data.set('projects', id, this.state).then(result => {
            if (result.success === true) {
                handleModalClose(true);
            } else {
                console.log('Something went wrong!');
            }
        });
    };

    multiSelectChangeEvent = (value, actionMeta) => {
        const { id } = this.state;
        this.setState({ projectFeatures: value });
        if (actionMeta.action === 'remove-value') {
            data.set('features', id, { action: 'removeOption', value: actionMeta.removedValue.value });
        }
        if (actionMeta === 'createOption') {
            data.set('features', id, { action: 'createOption', value });
        }
    };

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { handleModalClose, companies, departments, projectMngrs, activeProjects } = this.props;

        const features = '';

        const {
            loading,
            title,
            department_id, // eslint-disable-line camelcase
            start_date, // eslint-disable-line camelcase
            end_date, // eslint-disable-line camelcase
            rep_link, // eslint-disable-line camelcase
            staging_link, // eslint-disable-line camelcase
            slack_channel, // eslint-disable-line camelcase
            asanaID,
            jiraId,
            company_id, // eslint-disable-line camelcase
            project_mngr, // eslint-disable-line camelcase
            active_project, // eslint-disable-line camelcase
            projectFeatures
            // project_features // eslint-disable-line camelcase
        } = this.state;

        const fields = [
            {
                type: Text,
                name: 'title',
                label: 'Project Title',
                required: true,
                value: title
            },
            {
                type: DatePicker,
                name: 'start_date',
                label: 'Start Date',
                required: true,
                value: start_date
            },
            {
                type: DatePicker,
                name: 'end_date',
                label: 'End Date',
                required: true,
                value: end_date
            },
            {
                type: Text,
                name: 'rep_link',
                label: 'Repository Link',
                required: true,
                value: rep_link
            },
            {
                type: Text,
                name: 'staging_link',
                label: 'Staging Link',
                required: true,
                value: staging_link
            },
            {
                type: Text,
                name: 'slack_channel',
                label: 'Slack Channel',
                required: true,
                value: slack_channel
            },
            {
                type: Text,
                name: 'asanaID',
                label: 'Asana Project ID',
                required: true,
                value: asanaID
            },
            {
                type: Text,
                name: 'jiraId',
                label: 'Jira Project ID',
                required: true,
                value: jiraId
            },
            {
                type: Select,
                name: 'company_id',
                label: 'Company',
                list: companies,
                required: true,
                value: company_id
            },
            {
                type: Select,
                name: 'department_id',
                label: 'Department',
                list: departments,
                required: true,
                value: department_id
            },
            {
                type: MultiSelect,
                name: 'features',
                label: 'Features',
                list: features,
                required: true,
                value: projectFeatures,
                multiSelectChangeEvent: this.multiSelectChangeEvent
            },
            {
                type: Select,
                name: 'project_mngr',
                label: 'Project Manager',
                list: projectMngrs,
                required: true,
                value: project_mngr
            },
            {
                type: Radio,
                name: 'active_project',
                label: 'Active Project',
                list: activeProjects,
                required: true,
                value: active_project
            }
        ];
        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit Project</h2>
                </header>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="section__content">
                        <form className="form">
                            <div className="columns is-multiline">
                                {fields.map(field => {
                                    const { name, ...rest } = field;
                                    return (
                                        <field.type
                                            key={name}
                                            name={name}
                                            parentClass="column is-half"
                                            inputChangeEvent={this.inputChangeEvent}
                                            {...rest}
                                        />
                                    );
                                })}
                            </div>
                            <div className="field">
                                <button type="button" className="button is-primary" onClick={this.updateProjectData}>
                                    Submit
                                </button>
                                <button type="button" className="button is-danger right" onClick={handleModalClose}>
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

export default ProjectsEdit;

ProjectsEdit.defaultProps = {
    currencies: [
        { id: 'USD', title: 'USD' },
        { id: 'HRK', title: 'HRK' },
        { id: 'AUD', title: 'AUD' },
        { id: 'CAD', title: 'CAD' }
    ],
    paymentTypes: [{ id: 'per_project', title: 'Per project' }, { id: 'hourly', title: 'Hourly' }],
    departments: [{ id: 2, title: 'WP' }, { id: 3, title: 'Design' }, { id: 4, title: 'Enterprise' }],
    activeProjects: [{ id: 1, title: 'Yes' }, { id: 0, title: 'No' }],
    projectMngrs: [
        { id: 51, title: 'Brankica Basta' },
        { id: 29, title: 'Ljiljana Tušek Puhalo' },
        { id: 32, title: 'Pero Tolic' },
        { id: 4, title: 'Nikola Latin' }
    ]
};
