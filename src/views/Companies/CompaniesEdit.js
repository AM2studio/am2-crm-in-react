import React, { Component } from 'react';
import Text from '../../components/Form/Text';
import Loading from '../../components/General/Loading';
import WP_API from '../../data/Api';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
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
        console.log(this.state);
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
                            <div className="form__row">
                                <Text
                                    name="title"
                                    parentClass="form__column col-12"
                                    label="Company Title"
                                    required
                                    value={title}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                                <Text
                                    name="address"
                                    parentClass="form__column col-12"
                                    label="Address"
                                    required
                                    value={address}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                            </div>
                            <div className="form__row">
                                <Text
                                    name="city"
                                    parentClass="form__column col-12"
                                    label="City"
                                    required
                                    value={city}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                                <Text
                                    name="zip"
                                    parentClass="form__column col-12"
                                    label="ZIP / Postal code"
                                    value={zip}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                            </div>
                            <div className="form__row">
                                <Text
                                    name="province"
                                    parentClass="form__column col-12"
                                    label="State / Province"
                                    value={province}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                                <Text
                                    name="country"
                                    parentClass="form__column col-12"
                                    label="Country"
                                    value={country}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                            </div>
                            <div className="form__row">
                                <Text
                                    name="phone"
                                    parentClass="form__column col-12"
                                    label="Phone Number"
                                    value={phone}
                                    required
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                />
                                <Text
                                    name="contact_email"
                                    parentClass="form__column col-12"
                                    label="Contact Email"
                                    value={contact_email} // eslint-disable-line camelcase
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
                                    required
                                    propType="email"
                                />
                            </div>
                            <div className="form__row">
                                <Text
                                    name="website"
                                    parentClass="form__column col-1"
                                    label="Website"
                                    value={website}
                                    inputChangeEvent={this.inputChangeEvent}
                                    className="form__input"
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
                )}
            </div>
        );
    }
}
