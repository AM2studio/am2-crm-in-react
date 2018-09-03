import React, { Component } from 'react';
import WP_API from '../../Data/Api';

class Companies extends Component {
    constructor() {
        super();
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        const cachedCompanies = localStorage.getItem('companies');
        const url = 'http://crm.am2studio.com/wp-json/wp/v2/companies/';
        if (cachedCompanies) {
            this.setState({ companies: JSON.parse(cachedCompanies) });
        } else {
            const companies = new WP_API(url);
            companies.getPosts().then(result => {
                const nest = result.map(post => ({
                    id: post.id,
                    title: post.title.rendered
                }));
                this.setData(nest);
            });
        }
    }

    setData = data => {
        const { companies } = this.state;
        const newData = companies.concat(data);
        localStorage.setItem('companies', JSON.stringify(newData));
        this.setState({ companies: newData });
    };

    render() {
        const { companies } = this.state;
        return (
            <table>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Companies;
