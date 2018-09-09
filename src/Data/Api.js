import axios from 'axios';
import WP_AUTH from './Auth';

class WP_API {
    constructor() {
        this.url = 'http://crm.am2studio.com/wp-json/wp/v2/';
        this.editUrl = 'http://crm.am2studio.com/wp-json/crm/v2/';
        this.dataToFetch = undefined;
    }

    getAllPosts(type) {
        const results = [];
        return axios
            .get(`${this.url}${type}/`)
            .then(response => {
                const pageDataQueriesPromises = [];
                const totalPages = response.headers['x-wp-totalpages'];
                for (let i = 1; i <= totalPages; i += 1) {
                    pageDataQueriesPromises.push(axios.get(`${this.url}${type}?page=${i}`));
                }
                return Promise.all(pageDataQueriesPromises);
            })
            .then(data => {
                for (let i = 0; i < data.length; i += 1) {
                    const response = data[i];
                    results.push(...response.data);
                }
                return results;
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
        console.log(this.url);
        this.dataToFetch = dataToFetch;
    }

    get() {
        return axios
            .get(this.url)
            .then(response => {
                const fetchedData = this.dataToFetch.reduce((obj, value) => {
                    obj[value] = response.data[value]; // eslint-disable-line no-param-reassign
                    return obj;
                }, {});
                return fetchedData;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    setPost(type, id = undefined, dataToUpdate = undefined) {
        this.editUrl = `${this.editUrl}${type}/`;
        if (id) {
            this.editUrl = `${this.editUrl}${id}/`;
        }
        this.dataToUpdate = dataToUpdate;
        console.log(this.dataToUpdate);
        console.log(this.editUrl);
    }

    set() {
        const auth = new WP_AUTH();
        return axios({
            method: 'post',
            url: this.editUrl,
            headers: {
                Authorization: `Bearer ${auth.getSessionToken()}`
            },
            data: this.dataToUpdate
        })
            .then(response => response.data)
            .catch(error => {
                // handle error
                console.log(error);
            });
    }
}

export default WP_API;
