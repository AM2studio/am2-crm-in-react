import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import WP_API from '../../data/Api';

export default class extends Component {
    constructor(props) {
        super(props);
        const obj = {};
        // Loop through props object and set as states
        const result = Object.keys(props.singleCompanyData).reduce((prev, curr) => {
            obj[curr] = props.singleCompanyData[curr]; // eslint-disable-line no-param-reassign
            return obj;
        }, {});
        this.state = result;
    }

    updateCompanyData = () => {
        const { id, title, city } = this.state;
        const { handleModalClose, updateLocalDataAFterEdit } = this.props;
        const data = new WP_API();
        data.setPost('companies', id, this.state);
        data.set().then(result => {
            if (result.success === true) {
                updateLocalDataAFterEdit(result.data.type, result.data.id, title, city);
                handleModalClose();
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
            website
        } = this.state;
        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit Company</h2>
                </header>
                <div className="section__content">
                    <form className="form">
                        <div className="form__row">
                            <Text
                                name="title"
                                parentClass="form__column col-12"
                                title="Company Title"
                                required
                                value={title}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                            <Text
                                name="address"
                                parentClass="form__column col-12"
                                title="Address"
                                required
                                value={address}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                        </div>
                        <div className="form__row">
                            <Text
                                name="city"
                                parentClass="form__column col-12"
                                title="City"
                                required
                                value={city}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                            <Text
                                name="zip"
                                parentClass="form__column col-12"
                                title="ZIP / Postal code"
                                value={zip}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                        </div>
                        <div className="form__row">
                            <Text
                                name="province"
                                parentClass="form__column col-12"
                                title="State / Province"
                                value={province}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                            <Text
                                name="country"
                                parentClass="form__column col-12"
                                title="Country"
                                value={country}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                        </div>
                        <div className="form__row">
                            <Text
                                name="phone"
                                parentClass="form__column col-12"
                                title="Phone Number"
                                value={phone}
                                required
                                inputChangeEvent={this.inputChangeEvent}
                            />
                            <Text
                                name="contact_email"
                                parentClass="form__column col-12"
                                title="Contact Email"
                                value={contact_email} // eslint-disable-line camelcase
                                inputChangeEvent={this.inputChangeEvent}
                                required
                                email
                            />
                        </div>
                        <div className="form__row">
                            <Text
                                name="website"
                                parentClass="form__column col-1"
                                title="Website"
                                value={website}
                                inputChangeEvent={this.inputChangeEvent}
                            />
                        </div>
                        <div className="form__row">
                            <button
                                type="button"
                                className="button button--primary"
                                onClick={this.updateCompanyData}
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
