import React, { Component } from 'react';
import Vacations from './Vacations';
import WP_API from '../../data/Api';
import LoadingWidget from '../Dashboard/Widgets/LoadingWidget';

class VacationsContainer extends Component {
    constructor() {
        super();
        this.state = {
            vacations: []
        };
    }

    componentWillMount() {
        const api = new WP_API();
        api.getAllPosts('vacations').then(result => {
            const posts = result.map(post => ({
                id: post.id,
                author: post.author,
                start_date: post.start_date,
                end_date: post.end_date,
                note: post.note,
                status: post.status,
                days: post.days
            }));
            this.setState({ vacations: posts });
        });
    }

    approve = () => {
        console.log('radi');
    };

    status = status => {
        switch (status) {
            case 'approved':
                return <span className="note-type-positive">Approved</span>;
            case 'declined' || 'rejected':
                return <span className="note-type-negative">Rejected</span>;
            case 'pending':
                return (
                    <div>
                        <span className="note-type-neutral">Pending</span>
                        <button type="button" onClick={this.approve}>
                            ✓
                        </button>
                    </div>
                );
            default:
                return <span className="note-type-neutral">Pending</span>;
        }
    };

    render() {
        const { vacations } = this.state;

        const filteredData = vacations.map(user => {
            const filteredUser = user;
            filteredUser.status = this.status(user.status);
            return filteredUser;
        });
        const columns = [
            { key: 'author', title: 'Requested by' },
            { key: 'days', title: 'Days' },
            { key: 'start_date', title: 'Start Date' },
            { key: 'end_date', title: 'End Date' },
            { key: 'note', title: 'Note' },
            { key: 'status', title: 'Status' }
        ];
        return (
            <React.Fragment>
                {vacations.length > 0 ? (
                    <Vacations columns={columns} data={filteredData} addUser={this.addUser} />
                ) : (
                    <LoadingWidget className="section" title="User Vacations" />
                )}
            </React.Fragment>
        );
    }
}

export default VacationsContainer;
