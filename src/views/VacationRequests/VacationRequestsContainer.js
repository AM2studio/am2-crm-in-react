import React, { Component } from 'react';
import Vacations from './VacationRequests';
import WP_API from '../../data/Api';

class VacationsContainer extends Component {
    constructor() {
        super();
        this.state = {
            vacations: [],
            offset: 0,
            totalRecords: 0,
            loading: true
        };
    }

    componentWillMount() {
        this.getVacations();
    }

    getVacations = () => {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        api.getPosts('vacations', { itemsPerPage, offset }).then(result => {
            this.setState({
                vacations: result.data,
                totalRecords: result.count.publish,
                loading: false
            });
        });
    };

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getVacations();
        });
    };

    vacationRequest = (id, type, index) => {
        this.setState(prevState => {
            const { vacations } = prevState;
            vacations[index].status = type;
            return {
                vacations
            };
        });
        const api = new WP_API();
        api.set('vacations', id, { status: type }).then(result => {
            console.log(result);
        });
    };

    actionBtns = (id, index) => (
        <React.Fragment>
            <button
                type="button"
                className="button--table button--table--edit"
                onClick={() => {
                    this.vacationRequest(id, 'approved', index);
                }}
            >
                Approve
            </button>
            <button
                type="button"
                className="button--table button--table--delete"
                onClick={() => {
                    this.vacationRequest(id, 'rejected', index);
                }}
            >
                Reject
            </button>
        </React.Fragment>
    );

    status = status => {
        switch (status) {
            case 'approved':
                return <span className="note-type-positive">Approved</span>;
            case 'rejected':
                return <span className="note-type-negative">Rejected</span>;
            case 'declined':
                return <span className="note-type-negative">Rejected</span>;
            default:
                return <span className="note-type-neutral">Pending</span>;
        }
    };

    render() {
        console.log(this.state);
        const { vacations, totalRecords, loading } = this.state;
        const { itemsPerPage } = this.props;
        const filteredData = vacations.map((user, index) => ({
            ...user,
            btn: user.status === 'pending' ? this.actionBtns(user.id, index) : '',
            status: this.status(user.status)
        }));
        const columns = [
            { key: 'author', title: 'Requested by' },
            { key: 'days', title: 'Days' },
            { key: 'start_date', title: 'Start Date' },
            { key: 'end_date', title: 'End Date' },
            { key: 'note', title: 'Note' },
            { key: 'status', title: 'Status' },
            { key: 'btn', title: 'Action' }
        ];
        return (
            <Vacations
                columns={columns}
                data={filteredData}
                addUser={this.addUser}
                onPageChanged={this.onPageChanged}
                totalRecords={totalRecords}
                loading={loading}
                itemsPerPage={itemsPerPage}
            />
        );
    }
}

export default VacationsContainer;

VacationsContainer.defaultProps = {
    itemsPerPage: 20
};
