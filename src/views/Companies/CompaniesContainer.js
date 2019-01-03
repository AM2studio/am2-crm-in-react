import React, { Component } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Companies from './Companies';
import AM2Modal from '../../components/General/AM2Modal';
import CompaniesEdit from './CompaniesEdit';
import WP_API from '../../data/Api';
import { SharedDataConsumer } from '../../data/SharedDataContext';

class CompaniesContainer extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            singleCompanyData: {}
        };
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
        const { refreshCompanies } = this.context;
        this.setState({ modal: false });
        if (updated === true) {
            refreshCompanies(true);
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
        const { modal, singleCompanyData, loading } = this.state;
        const { itemsPerPage } = this.props;
        const columns = [
            { key: 'id', title: 'ID' },
            { key: 'title', title: 'Title' },
            { key: 'city', title: 'City' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                <SharedDataConsumer>
                    {({ companies }) => (
                        <Companies
                            columns={columns}
                            companies={companies}
                            addCompany={this.addCompany}
                            totalRecords={companies.length}
                            loading={loading}
                            itemsPerPage={itemsPerPage}
                            actionBtns={this.actionBtns}
                        />
                    )}
                </SharedDataConsumer>

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

CompaniesContainer.contextType = SharedDataConsumer;
