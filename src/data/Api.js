import axios from 'axios';
import WP_AUTH from './Auth';

class WP_API {
    constructor() {
        this.url = 'http://crm.am2studio.com/wp-json/crm/v2/';
        this.dataToFetch = undefined;
        this.auth = new WP_AUTH();
    }

    getPosts(type, data = undefined) {
        console.log(data);
        return axios({
            method: 'get',
            url: `${this.url}${type}/`,
            headers: {
                Authorization: `Bearer ${this.auth.getSessionToken()}`
            },
            params: data
        })
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    /*
    params: type = post_type, id = post_id
    */
    getPost(type, id = undefined, dataToFetch = undefined) {
        this.url = `${this.url}${type}/`;
        if (id) {
            this.url = `${this.url}${id}/`;
        }
        this.dataToFetch = dataToFetch;
    }

    get() {
        return axios({
            method: 'get',
            url: this.url,
            headers: {
                Authorization: `Bearer ${this.auth.getSessionToken()}`
            }
        })
            .then(response => {
                console.log(response);
                const fetchedData = this.dataToFetch.reduce((obj, value) => {
                    obj[value] = response.data[0][value]; // eslint-disable-line no-param-reassign
                    return obj;
                }, {});
                console.log(fetchedData);
                return fetchedData;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    setPost(type, id = undefined, dataToUpdate = undefined) {
        this.url = `${this.url}${type}/`;
        if (id) {
            this.url = `${this.url}${id}/`;
        }
        this.dataToUpdate = dataToUpdate;
    }

    set() {
        return axios({
            method: 'post',
            url: this.url,
            headers: {
                Authorization: `Bearer ${this.auth.getSessionToken()}`
            },
            data: this.dataToUpdate
        })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }
}

export default WP_API;
