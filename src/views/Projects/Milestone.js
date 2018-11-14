import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Select from '../../components/Form/Select';
import WP_API from '../../data/Api';

class Milestone extends Component {
    constructor(props) {
        super(props);
        const { milestones } = this.props;
        const obj = {};
        // Loop through props object and set as states
        const result = Object.keys(milestones).reduce((prev, curr) => {
            obj[curr] = milestones[curr];
            return obj;
        }, {});
        this.state = { ...result, snapshot: false };
    }

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    milestoneSnapshot = () => {
        const { id } = this.state;
        const { project } = this.props;
        this.setState({ snapshot: true });
        const api = new WP_API();
        const data = this.state;
        data.project = project;
        api.set('project-earnings', id, data).then(result => {
            if (result.success) {
                console.log(result);
            }
        });
    };

    milestoneAction = action => {
        const { id } = this.state;
        const { project, actionType, milestoneKey } = this.props;
        const api = new WP_API();
        const data = this.state;
        data.action = action;
        data.project = project;
        api.set('milestones', id, data).then(result => {
            if (result.success) {
                if (action === 'save') {
                    this.setState({ id: result.id });
                }
                actionType(result.action, milestoneKey);
            }
        });
    };

    render() {
        const { paymentTypes, currencies } = this.props;
        const {
            title,
            currency,
            snapshot,
            completion_rate, // eslint-disable-line camelcase
            hourly_rate, // eslint-disable-line camelcase
            quoted_hours, // eslint-disable-line camelcase
            total_price, // eslint-disable-line camelcase
            payment_type // eslint-disable-line camelcase
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
                type: Select,
                name: 'payment_type',
                label: 'Payment Type',
                list: paymentTypes,
                required: true,
                value: payment_type
            },
            {
                type: Text,
                propType: 'number',
                name: 'total_price',
                label: 'Total Price',
                required: true,
                value: total_price
            },
            {
                type: Text,
                propType: 'number',
                name: 'quoted_hours',
                label: 'Quoted Hours',
                required: true,
                value: quoted_hours
            },
            {
                type: Text,
                propType: 'number',
                name: 'completion_rate',
                label: 'Completion Rate',
                required: true,
                value: completion_rate
            },
            {
                type: Text,
                propType: 'number',
                name: 'hourly_rate',
                label: 'Hourly Rate',
                required: true,
                value: hourly_rate
            },
            {
                type: Select,
                name: 'currency',
                label: 'Currency',
                list: currencies,
                required: true,
                value: currency
            }
        ];

        return (
            <React.Fragment>
                {fields.map(field => {
                    const { name, ...rest } = field;
                    return (
                        <field.type
                            key={name}
                            name={name}
                            parentClass="form__column col-12"
                            className="form__input"
                            inputChangeEvent={this.inputChangeEvent}
                            {...rest}
                        />
                    );
                })}
                <div className="form__column col-12">
                    <label htmlFor="actions">Actions</label>
                    <div className="form__column__buttons">
                        <button
                            type="button"
                            className="button"
                            onClick={() => this.milestoneAction('save')}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="button"
                            onClick={() => this.milestoneAction('delete')}
                        >
                            Delete
                        </button>
                        {snapshot ? (
                            <span className="button--snapshot">Snapshot taken</span>
                        ) : (
                            <button
                                type="button"
                                className="button"
                                onClick={this.milestoneSnapshot}
                            >
                                Snapshot
                            </button>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Milestone;

Milestone.defaultProps = {
    currencies: [
        { id: 'USD', title: 'USD' },
        { id: 'HRK', title: 'HRK' },
        { id: 'AUD', title: 'AUD' },
        { id: 'CAD', title: 'CAD' }
    ],
    paymentTypes: [{ id: 'per_project', title: 'Per project' }, { id: 'hourly', title: 'Hourly' }]
};
