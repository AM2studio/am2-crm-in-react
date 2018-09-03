import axios from 'axios';

class WP_API {
    constructor(url) {
        this.url = url;
    }

    getPosts() {
        const results = [];
        return axios
            .get(this.url)
            .then(response => {
                const pageDataQueriesPromises = [];
                const totalPages = response.headers['x-wp-totalpages'];
                for (let i = 1; i <= totalPages; i += 1) {
                    pageDataQueriesPromises.push(axios.get(`${this.url}?page=${i}`));
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
}

export default WP_API;
