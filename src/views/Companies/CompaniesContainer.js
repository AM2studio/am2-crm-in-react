import React, { Component } from 'react';
import Companies from './Companies';
import AM2Modal from '../../components/General/AM2Modal';
import CompaniesEdit from './CompaniesEdit';
import WP_API from '../../data/Api';

class CompaniesContainer extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            modal: false,
            singleCompanyData: {}
        };
    }

    componentDidMount() {
        const cachedCompanies = localStorage.getItem('companies');
        if (cachedCompanies) {
            this.setState({ companies: JSON.parse(cachedCompanies) });
        } else {
            const companies = new WP_API();
            companies.getAllPosts('companies').then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title,
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

    updateLocalDataAFterEdit = (id, title, city) => {
        const { companies } = this.state;
        const updatedCompanies = companies.map(
            company => (company.id === id ? { ...company, title, city } : company)
        );
        this.setState({ companies: updatedCompanies });
    };

    editCompany = (e, id) => {
        console.log(`Editing company with id: ${id}`);
        const dataToFetch = [
            'id',
            'title',
            'address',
            'city',
            'contact_email',
            'country',
            'province',
            'phone',
            'zip',
            'website'
        ];
        const data = new WP_API();
        data.getPost('companies', id, dataToFetch);
        data.get().then(result => {
            this.setState(() => ({
                modal: true,
                singleCompanyData: result
            }));
        });
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
        const { companies, modal, singleCompanyData } = this.state;

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
            <React.Fragment>
                <Companies columns={columns} data={newComp} />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <CompaniesEdit
                        singleCompanyData={singleCompanyData}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
                        updateLocalDataAFterEdit={this.updateLocalDataAFterEdit}
                    />
                </AM2Modal>
            </React.Fragment>
        );
    }
}

export default CompaniesContainer;
