import axios from 'axios';

class WP_API {
    constructor() {
        this.url = 'http://crm.am2studio.com/wp-json/wp/v2/';
        this.dataToFetch = undefined;
    }

    getPosts(type) {
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
                console.log(fetchedData);
                return fetchedData;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }
}

export default WP_API;
