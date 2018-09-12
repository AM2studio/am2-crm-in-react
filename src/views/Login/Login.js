import React from 'react';

import './login.css';

const divStyle = {
    backgroundImage: "url('https://source.unsplash.com/random/600x1000')"
};
const logoStyle = {
    maxWidth: '250px'
};

const Login = props => {
    const { handleChange, login } = props;
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <div className="w-full text-center logo">
                            <img
                                style={logoStyle}
                                alt="Logo"
                                src="http://crm.am2studio.com/am2.jpg"
                            />
                        </div>
                        <span className="login100-form-title p-b-34">Account Login</span>

                        <div
                            className="wrap-input100 validate-input m-b-20"
                            data-validate="Type user name"
                        >
                            <input
                                className="input100"
                                type="text"
                                name="username"
                                id="username"
                                onChange={handleChange}
                                placeholder="Username"
                            />
                            <span className="focus-input100" />
                        </div>
                        <div
                            className="wrap-input100 validate-input m-b-20"
                            data-validate="Type password"
                        >
                            <input
                                type="password"
                                className="input100"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                            <span className="focus-input100" />
                        </div>

                        <div className="container-login100-form-btn">
                            <button type="button" onClick={login} className="login100-form-btn">
                                Sign in
                            </button>
                        </div>

                        <div className="w-full text-center p-t-27 p-b-239" />
                    </form>

                    <div className="login100-more" style={divStyle} />
                </div>
            </div>
        </div>
    );
};

export default Login;
