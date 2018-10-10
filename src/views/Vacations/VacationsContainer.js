import React, { Component } from 'react';
import moment from 'moment';
import Vacations from './Vacations';
import WP_API from '../../data/Api';

class VacationsContainer extends Component {
    constructor() {
        super();
        this.state = {
            vacations: [],
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
                loading: false
            });
        });
    };

    render() {
        const { vacations, loading } = this.state;
        const filteredData = vacations.reduce((filtered, current) => {
            if (current.status === 'approved') {
                filtered.push({
                    id: current.id,
                    group: current.author_id,
                    title: `Vacation for ${current.days} days`, // current.note ||
                    start_time: moment(current.start_date, 'DD-MM-YYYY'),
                    end_time: moment(current.end_date, 'DD-MM-YYYY').add('1', 'day') // as its countint till this day 00:00
                });
            }
            return filtered;
        }, []);
        return <Vacations data={filteredData} loading={loading} />;
    }
}

export default VacationsContainer;

VacationsContainer.defaultProps = {
    itemsPerPage: 999
};
