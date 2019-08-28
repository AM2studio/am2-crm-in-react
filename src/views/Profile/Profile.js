import React from 'react';
import Loading from '../../components/General/Loading';
import Notification from '../../components/Form/Notification';

const Profile = props => {
    const { fields, loading, updateProfileData, inputChangeEvent, status, msg, closeNotification } = props;
    return (
        <div className="section">
            <header className="section__header">
                <h2 className="section__title">Edit Profile</h2>
            </header>
            {loading ? (
                <Loading />
            ) : (
                <div className="section__content">
                    <form className="form">
                        {status ? <Notification text={msg} type={status} close={closeNotification} /> : ''}
                        <div className="columns is-multiline">
                            {fields.map(field => {
                                const { name, ...rest } = field;
                                return (
                                    <field.type
                                        key={name}
                                        name={name}
                                        parentClass="column is-one-quarter"
                                        inputChangeEvent={inputChangeEvent}
                                        {...rest}
                                    />
                                );
                            })}
                        </div>
                        <p>
                            You can get Toggl API token:{' '}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.toggl.com/app/profile#api_token"
                            >
                                here.
                            </a>
                        </p>
                        <div className="field">
                            <button type="button" className="button is-primary" onClick={updateProfileData}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
