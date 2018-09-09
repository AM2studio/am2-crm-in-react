import axios from 'axios';

class WP_AUTH {
    constructor() {
        this.url = 'http://crm.am2studio.com/wp-json/jwt-auth/v1/token';
        this.validateUrl = 'http://crm.am2studio.com/wp-json/jwt-auth/v1/token/validate';
        this.tokenKey = 'crmTokenKey';
        this.userName = 'crmUserName';
    }

    getSessionToken = () => sessionStorage.getItem(this.tokenKey);

    removeSessionToken = () => sessionStorage.removeItem(this.tokenKey);

    isAuthenticated = () => {
        if (this.getSessionToken() === null) {
            return false;
        }
        return axios({
            method: 'post',
            url: this.validateUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.getSessionToken()}`
            }
        })
            .then(() => true)
            .catch(error => {
                console.log(error);
                return false;
            });
    };

    authenticate(username, password) {
        return axios
            .post(this.url, {
                username,
                password
            })
            .then(response => {
                console.log(response);
                sessionStorage.setItem(this.tokenKey, response.data.token);
                sessionStorage.setItem(this.userName, response.data.user_display_name);
                return response.status;
            })
            .catch(error => {
                // handle error
                console.log(error);
                return error;
            });
    }
}

export default WP_AUTH;
