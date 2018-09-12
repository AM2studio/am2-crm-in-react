import React, { Component } from 'react';
import AddTime from './Widgets/AddTime';
import AddNote from './Widgets/AddNote';
import AddHighFive from './Widgets/AddHighFive';
import RequestVacation from './Widgets/RequestVacation';
import WP_API from '../../data/Api';
// import WP_AUTH from '../data/Auth';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            projects: []
        };

        const { companies, projects } = this.state;
        console.log(companies, projects);
    }

    componentDidMount() {
        const cachedCompanies = localStorage.getItem('companies');
        const cachedProjects = localStorage.getItem('projects');
        // Get Companies
        if (cachedCompanies) {
            this.setState({ companies: JSON.parse(cachedCompanies) });
        } else {
            const api = new WP_API();
            api.getAllPosts('companies').then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title,
                    city: post.city
                }));
                localStorage.setItem('companies', JSON.stringify(posts));
                this.setState(() => ({ companies: posts }));
            });
        }
        // Get Projects
        if (cachedProjects) {
            this.setState({ projects: JSON.parse(cachedProjects) });
        } else {
            const api = new WP_API();
            api.getAllPosts('projects').then(result => {
                const posts = result.map(post => ({
                    id: post.id,
                    title: post.title,
                    company: post.company_name
                }));
                localStorage.setItem('projects', JSON.stringify(posts));
                this.setState(() => ({ projects: posts }));
            });
        }
    }

    render() {
        const { companies } = this.state;
        return (
            <React.Fragment>
                <AddTime />
                <AddNote companies={companies} />
                <AddHighFive />
                <RequestVacation />
                <div className="section col-14">
                    <div className="section__content">
                        <div className="widget">
                            <span className="widget__title">Todays online sales</span>
                            <span className="widget__value">559</span>
                            <span className="widget__status color-primary">9%</span>
                            <span className="widget__status">
                                <strong>123</strong> last hour
                            </span>
                            <div className="widget__chart c3-mini" id="chart1" />
                            <script defer="defer" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Dashboard;
