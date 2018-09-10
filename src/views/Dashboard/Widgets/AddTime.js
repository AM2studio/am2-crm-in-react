import React, { Component } from 'react';
import Text from '../../../components/Form/Text';
import '../../../styles/custom.css';

class AddTime extends Component {
    render() {
        const { inputs } = this.props;
        return (
            <div className="section col-14 widget">
                <header className="section__header">
                    <h4 className="section__title">Add New Task</h4>
                </header>
                <div className="section__content">
                    <div className="widget">
                        <form className="form">
                            <div className="form__row">
                                {inputs.map(field => (
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTime;

AddTime.defaultProps = {
    inputs: [
        {
            type: Text,
            name: 'title',
            label: 'Project Title',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            propType: 'number',
            name: 'total_price',
            label: 'Total Price',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            name: 'title',
            label: 'Project Title',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            propType: 'number',
            name: 'total_price',
            label: 'Total Price',
            required: true,
            value: '',
            parentClass: 'form__column col-12'
        },
        {
            type: Text,
            name: 'title',
            label: 'Project Title',
            required: true,
            value: '',
            parentClass: 'form__column col-12'
        },
        {
            type: Text,
            propType: 'number',
            name: 'total_price',
            label: 'Total Price',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        },
        {
            type: Text,
            name: 'title',
            label: 'Project Title',
            required: true,
            value: '',
            parentClass: 'form__column col-1 form__row'
        }
    ]
};
