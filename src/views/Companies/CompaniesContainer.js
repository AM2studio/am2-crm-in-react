import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
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
            totalRecords: 0,
            loading: true
        };
    }

    componentWillMount() {
        this.getCompanies();
    }

    getCompanies(byPassCache = false) {
        const api = new WP_API();
        api.getPosts('companies', null, byPassCache).then(result => {
            const posts = result.data.map(post => ({
                id: post.id,
                title: post.title,
                city: post.city
            }));
            this.setState({
                companies: posts,
                totalRecords: result.count.publish,
                loading: false
            });
        });
    }

    addCompany = () => {
        this.setState(() => ({
            modal: true,
            singleCompanyData: false
        }));
    };

    editCompany = (e, id) => {
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
        this.setState({ modal: true });
        const data = new WP_API();
        data.get('companies', id, dataToFetch).then(result => {
            this.setState({ singleCompanyData: result });
        });
    };

    handleModalClose = updated => {
        this.setState({ modal: false });
        if (updated === true) {
            this.getCompanies(true);
        }
    };

    deleteCompany = (e, id) => {
        console.log(`Deleting company with id: ${id}`);
    };

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button--table button--table--edit"
                onClick={e => {
                    this.editCompany(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button--table button--table--delete"
                onClick={e => {
                    this.deleteCompany(e, id);
                }}
            >
                <FaTrashAlt />
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
                    totalRecords={totalRecords}
                    loading={loading}
                    itemsPerPage={itemsPerPage}
                />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <CompaniesEdit
                        singleCompanyData={singleCompanyData}
                        handleModalClose={this.handleModalClose}
                        inputChangeEvent={this.inputChangeEvent}
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
