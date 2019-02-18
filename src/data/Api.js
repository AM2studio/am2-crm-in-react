import axios from 'axios';
import lscache from 'lscache';
import WP_AUTH from './Auth';

const TTL_MINUTES = 5;

class WP_API {
    constructor() {
        this.url = 'https://oldcrm.am2studio.com/wp-json/crm/v2/';
        this.auth = new WP_AUTH();
    }

    async getPosts(type, data = undefined, byPassCache = false, byPassCacheSave = true) {
        const fetchURL = `${this.url}${type}/`;
        let cacheKey = fetchURL;
        if (data && data.offset) {
            cacheKey = `${fetchURL}${data.offset}`;
        }
        let cachedResponse = lscache.get(cacheKey);

        if (cachedResponse === null || byPassCache === true) {
            cachedResponse = await axios({
                method: 'get',
                url: fetchURL,
                headers: {
                    Authorization: `Bearer ${this.auth.getSessionToken()}`
                },
                params: data
            })
                .then(response => {
                    if (byPassCacheSave === true) {
                        lscache.set(cacheKey, response.data, TTL_MINUTES);
                    }
                    return response.data;
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                });
        }

        return cachedResponse;
    }

    /*
    params: type = post_type, id = post_id, dataToFetch = array(meta)
    */
    get(type, id = undefined, dataToFetch = undefined) {
        this.url = `${this.url}${type}/`;
        if (id) {
            this.url = `${this.url}${id}/`;
        }
        return axios({
            method: 'get',
            url: this.url,
            headers: {
                Authorization: `Bearer ${this.auth.getSessionToken()}`
            }
        })
            .then(response => {
                console.log(response);
                if (type === 'milestones') {
                    return response.data;
                }
                const fetchedData = dataToFetch.reduce((obj, value) => {
                    obj[value] = response.data.data[0][value]; // eslint-disable-line no-param-reassign
                    return obj;
                }, {});
                return fetchedData;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    set(type, id = undefined, dataToUpdate = undefined) {
        let url = `${this.url}${type}/`;
        if (id) {
            url = `${url}${id}/`;
        }
        return axios({
            method: 'post',
            url,
            headers: {
                Authorization: `Bearer ${this.auth.getSessionToken()}`
            },
            data: dataToUpdate
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

    delete(type, id = undefined) {
        this.url = `${this.url}${type}/`;
        if (id) {
            this.url = `${this.url}${id}/`;
        }
        return axios({
            method: 'post',
            url: this.url,
            headers: {
                Authorization: `Bearer ${this.auth.getSessionToken()}`
            },
            data: { delete: true }
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
