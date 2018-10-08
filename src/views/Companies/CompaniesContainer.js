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
            singleCompanyData: {},
            offset: 0,
            totalRecords: 0,
            loading: true
        };
    }

    componentWillMount() {
        this.getCompanies();
    }

    getCompanies() {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const cachedCompanies = localStorage.getItem('companies');
        if (cachedCompanies) {
            const companies = JSON.parse(cachedCompanies);
            this.setState(() => ({
                companies: companies.slice(offset, offset + itemsPerPage),
                totalRecords: companies.length,
                loading: false
            }));
        } else {
            const companies = new WP_API();
            companies.getPosts('companies', { itemsPerPage: 9999, offset }).then(result => {
                const posts = result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    city: post.city
                }));
                localStorage.setItem('companies', JSON.stringify(posts));
                this.setState({
                    companies: posts,
                    totalRecords: result.count.publish,
                    loading: false
                });
            });
        }
    }

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getCompanies();
        });
    };

    updateLocalDataAFterEdit = (type, id, title, city) => {
        const { companies } = this.state;
        let updatedCompanies = companies;
        if (type === 'edit') {
            updatedCompanies = companies.map(
                company => (company.id === id ? { ...company, title, city } : company)
            );
        } else {
            updatedCompanies = [
                {
                    id,
                    title,
                    city
                }
            ].concat(companies);
        }

        this.setState({ companies: updatedCompanies });
    };

    addCompany = () => {
        this.setState(() => ({
            modal: true,
            singleCompanyData: false
        }));
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
        const { companies, modal, singleCompanyData, totalRecords, loading } = this.state;
        const { itemsPerPage } = this.props;

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
                <Companies
                    columns={columns}
                    data={newComp}
                    addCompany={this.addCompany}
                    onPageChanged={this.onPageChanged}
                    totalRecords={totalRecords}
                    loading={loading}
                    itemsPerPage={itemsPerPage}
                />
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

CompaniesContainer.defaultProps = {
    itemsPerPage: 20
};
