import React, { Component } from 'react';
import Companies from './Companies';
import WP_API from '../../data/Api';

class CompaniesContainer extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            modal: false,
            editId: ''
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
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title.rendered,
                    city: post.city
                }));
                this.setData(posts);
            });
        }
    }

    setData = data => {
        const { companies } = this.state;
        const newData = companies.concat(data);
        localStorage.setItem('companies', JSON.stringify(newData));
        this.setState({ companies: newData });
    };

    editCompany = (e, id) => {
        this.setState(state => ({ modal: !state.modal, edit: id }));
        console.log(`Editing company with id: ${id}`);
    };

    handleModalClose = () => {
        this.setState({ modal: false });
    };

    deleteCompany = (e, id) => {
        console.log(`Deleting company with id: ${id}`);
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button button--primary button--small button--bold"
                onClick={e => {
                    this.editCompany(e, id);
                }}
            >
                Edit
            </button>
            <button
                type="button"
                className="button button--danger button--small button--bold"
                onClick={e => {
                    this.deleteCompany(e, id);
                }}
            >
                Delete
            </button>
        </React.Fragment>
    );

    render() {
        const { companies, modal, editId } = this.state;

        const newComp = companies.map(value => {
            const newValue = value;
            newValue.btn = this.actionBtns(value.id);
            return newValue;
        });
        const columns = [
            { key: 'id', title: 'ID' },
            { key: 'title', title: 'Title' },
            { key: 'city', title: 'City' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <Companies
                columns={columns}
                data={newComp}
                modal={modal}
                editId={editId}
                handleModalClose={this.handleModalClose}
            />
        );
    }
}

export default CompaniesContainer;
