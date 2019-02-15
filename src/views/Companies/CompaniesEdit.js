import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Loading from '../../components/General/Loading';
import WP_API from '../../data/Api';

export default class extends Component {
    constructor(props) {
        super(props);
        const { singleCompanyData } = props;
        this.state = {
            loading: !!singleCompanyData
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading === true) {
            const { singleCompanyData } = this.props;
            const obj = {};
            // Loop through props object and set as states
            const result = Object.keys(singleCompanyData).reduce((prev, curr) => {
                obj[curr] = singleCompanyData[curr];
                return obj;
            }, {});
            this.setState({ ...result, loading: false }); // eslint-disable-line
        }
    }

    updateCompanyData = () => {
        const { id } = this.state;
        const { handleModalClose } = this.props;
        const api = new WP_API();
        api.set('companies', id, this.state).then(result => {
            if (result.success === true) {
                handleModalClose(true);
            } else {
                console.log(result.data.error);
            }
        });
    };

    inputChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { handleModalClose } = this.props;
        const {
            title,
            address,
            city,
            zip,
            province,
            country,
            phone,
            contact_email, // eslint-disable-line camelcase
            website,
            loading
        } = this.state;

        const fields = [
            {
                type: Text,
                name: 'title',
                label: 'Company Title',
                required: true,
                value: title
            },
            {
                type: Text,
                name: 'address',
                label: 'Street Address',
                required: true,
                value: address
            },
            {
                type: Text,
                name: 'city',
                label: 'City',
                required: true,
                value: city
            },
            {
                type: Text,
                name: 'zip',
                label: 'ZIP Code',
                required: true,
                value: zip
            },
            {
                type: Text,
                name: 'province',
                label: 'State / Province',
                required: true,
                value: province
            },
            {
                type: Text,
                name: 'country',
                label: 'Country',
                required: true,
                value: country
            },
            {
                type: Text,
                name: 'phone',
                label: 'Phone Number',
                required: true,
                value: phone
            },
            {
                type: Text,
                name: 'contact_email',
                label: 'Contact Email',
                required: true,
                value: contact_email
            },
            {
                type: Text,
                name: 'website',
                label: 'WebSite',
                required: true,
                value: website
            }
        ];

        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit Company</h2>
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
                                <button type="button" className="button is-primary" onClick={this.updateCompanyData}>
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
