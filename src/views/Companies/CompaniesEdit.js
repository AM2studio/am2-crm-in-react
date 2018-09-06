import React from 'react';
import Text from '../../components/Form/Text';

const nest = props => {
    const { handleModalClose } = props;
    return (
        <div className="section">
            <header className="section__header">
                <h2 className="section__title">Edit Company</h2>
            </header>
            <div className="section__content">
                <form className="form">
                    <div className="form__row">
                        <Text
                            name="company_title"
                            parentClass="form__column col-12"
                            title="Company Title"
                            required
                        />
                        <Text
                            name="address"
                            parentClass="form__column col-12"
                            title="Address"
                            required
                        />
                    </div>
                    <div className="form__row">
                        <Text name="city" parentClass="form__column col-12" title="City" required />
                        <Text
                            name="zip"
                            parentClass="form__column col-12"
                            title="ZIP / Postal code"
                        />
                    </div>
                    <div className="form__row">
                        <Text
                            name="province"
                            parentClass="form__column col-12"
                            title="State / Province"
                        />
                        <Text name="country" parentClass="form__column col-12" title="Country" />
                    </div>
                    <div className="form__row">
                        <Text
                            name="phone"
                            parentClass="form__column col-12"
                            title="Phone Number"
                            required
                        />
                        <Text
                            name="contact_email"
                            parentClass="form__column col-12"
                            title="Contact Email"
                            required
                            email
                        />
                    </div>
                    <div className="form__row">
                        <Text name="website" parentClass="form__column col-1" title="Website" />
                    </div>
                    <div className="form__row">
                        <button type="button" className="button button--primary">
                            Submit
                        </button>
                        <button type="button" className="button right" onClick={handleModalClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default nest;
