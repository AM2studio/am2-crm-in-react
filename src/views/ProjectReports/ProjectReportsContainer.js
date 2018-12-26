import React, { Component } from 'react';
import moment from 'moment';
import randomColor from 'randomcolor';
import ProjectReports from './ProjectReports';
import Filters from './components/Filters';
import MiniChart from './components/MiniChart';
import UserPerDateChart from './components/UserPerDateChart';
import TotalHoursTable from './components/TotalHoursTable';
import Loading from '../../components/General/Loading';
import WP_API from '../../data/Api';

class ProjectReportsContainer extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            empty: false,
            totalRecords: 0,
            filterProject: '',
            filterDepartment: '',
            filterJobType: '',
            filterDate: {
                start: moment(
                    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    'YYYY-MM-DD'
                ),
                end: moment(
                    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                    'YYYY-MM-DD'
                )
            },
            userData: false,
            projectsList: [],
            projectReports: [],
            barChartData: [],
            hoursPerUser: [],
            hoursPerJobType: [],
            hoursPerMilestone: [],
            chartOptions: {
                legend: {
                    position: 'right'
                },
                tooltips: {
                    intersect: false
                }
            }
        };
    }

    componentWillMount() {
        const api = new WP_API();
        api.getPosts('projects').then(result =>
            this.setState({
                projectsList: result.data
            })
        );
    }

    generateRandomColors = length =>
        Array(length)
            .fill()
            .map((_, i) => randomColor({ luminosity: 'bright' }));

    getData = () => {
        const { filterProject, filterDepartment, filterJobType, filterDate } = this.state;
        const byPassCache = true;
        const byPassCacheSave = false;
        const api = new WP_API();
        api.getPosts(
            'project-reports',
            {
                itemsPerPage: 20000,
                filterProject,
                filterDepartment,
                filterJobType,
                filterDate
            },
            byPassCache,
            byPassCacheSave
        ).then(result => {
            console.log(result);
            const posts =
                result.data &&
                result.data.map(post => ({
                    id: post.id,
                    billable_hours: post.billable_hours,
                    month: post.month,
                    user: post.user,
                    project: post.project,
                    milestones: post.milestones,
                    milestone: post.milestone,
                    project_feature: post.project_feature,
                    date: post.date,
                    // hours: post.hours,
                    job_type: post.job_type,
                    comment: post.comment,
                    asana_url: post.asana_url
                }));
            if (!posts) {
                this.setState({
                    loading: false
                });
            } else {
                this.setState({
                    projectReports: posts,
                    totalRecords: result.data ? result.data.count : 0,
                    totalHours: result.report.data.totals.hours,
                    userData: {
                        labels: result.report.data.totals.users.labels,
                        datasets: [
                            {
                                data: result.report.data.totals.users.hours,
                                backgroundColor: this.generateRandomColors(
                                    result.report.data.totals.users.hours.length
                                )
                            }
                        ]
                    },
                    jobTypeData: {
                        labels: result.report.data.totals.job_type.labels,
                        datasets: [
                            {
                                data: result.report.data.totals.job_type.hours,
                                backgroundColor: this.generateRandomColors(
                                    result.report.data.totals.job_type.hours.length
                                )
                            }
                        ]
                    },
                    milestoneData: {
                        labels: result.report.data.totals.milestones.labels,
                        datasets: [
                            {
                                data: result.report.data.totals.milestones.hours,
                                backgroundColor: this.generateRandomColors(
                                    result.report.data.totals.milestones.hours.length
                                )
                            }
                        ]
                    },
                    barChartData: Object.values(result.report.data.totals.users.dates)
                        ? Object.values(result.report.data.totals.users.dates).map(bar => ({
                              ...bar,
                              backgroundColor: randomColor({ luminosity: 'bright' })
                          }))
                        : [],
                    empty: result.totalRecords === 0,
                    hoursPerUser: Object.values(result.report.data.totals.users.list).map(user => ({
                        ...user
                    })),
                    hoursPerMilestone: Object.values(result.report.data.totals.milestones.list).map(
                        milestone => ({
                            ...milestone
                        })
                    ),
                    hoursPerJobType: Object.values(result.report.data.totals.job_type.list).map(
                        jobtype => ({
                            ...jobtype
                        })
                    ),
                    loading: false
                });
            }
        });
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState(
            {
                ...this.initialState,
                [name]: value,
                loading: true
            },
            () => {
                this.getData();
            }
        );
    };

    hours = (hour, billable_hours) => <p data-tip={`billable: ${billable_hours}`}>{hour}</p>; // eslint-disable-line camelcase

    date = (date, month) => <p data-tip={month}>{date}</p>;

    filterJobType = jobType => {
        const jobTypeClass = jobType.replace(/[^a-zA-Z]+/g, '');
        return <span className={`jobtype ${jobTypeClass}`}>{jobType}</span>;
    };

    asana = asana => (
        <a href={asana} rel="noopener noreferrer" target="_blank" data-tip={asana}>
            {asana}
        </a>
    );

    render() {
        const {
            projectReports,
            totalHours,
            totalRecords,
            loading,
            filterProject,
            filterDepartment,
            filterJobType,
            empty,
            projectsList,
            chartOptions,
            userData,
            jobTypeData,
            milestoneData,
            barChartData,
            hoursPerUser,
            hoursPerMilestone,
            hoursPerJobType
        } = this.state;
        const filteredData = projectReports.map(entry => ({
            ...entry,
            job_type: this.filterJobType(entry.job_type),
            hours: this.hours(entry.hours, entry.billable_hours),
            date: this.date(entry.date, entry.month),
            asana_url: entry.asana_url && this.asana(entry.asana_url)
            //    buttons: this.actionBtns(entry.id)
        }));

        const columns = [
            { key: 'user', title: 'User' },
            { key: 'billable_hours', title: 'Billable Hours' },
            { key: 'date', title: 'Date' },
            { key: 'project', title: 'Project' },
            { key: 'milestone', title: 'Milestone' },
            { key: 'job_type', title: 'Job Type' },
            { key: 'comment', title: 'Comment' },
            { key: 'asana_url', title: 'Asana URL' }
        ];

        const totalHoursColumns = [
            { key: 'name', title: 'User' },
            { key: 'billable', title: 'Hours' }
        ];
        if (loading) {
            return (
                <React.Fragment>
                    <Filters
                        projectsList={projectsList}
                        filterChangeEvent={this.filterChangeEvent}
                        filterProject={filterProject}
                        filterDepartment={filterDepartment}
                        filterJobType={filterJobType}
                    />
                    <Loading />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Filters
                    projectsList={projectsList}
                    filterChangeEvent={this.filterChangeEvent}
                    filterProject={filterProject}
                    filterDepartment={filterDepartment}
                    filterJobType={filterJobType}
                />
                {userData ? (
                    <div className="section__content section__minicharts">
                        <div className="miniChartContainer">
                            <MiniChart
                                data={userData}
                                title="Total Hours per User"
                                totalHours={totalHours}
                                options={chartOptions}
                            />
                            <MiniChart
                                data={jobTypeData}
                                title="Total Hours per Job Type"
                                totalHours={totalHours}
                                options={chartOptions}
                            />
                            <MiniChart
                                data={milestoneData}
                                title="Total Hours per Milestone"
                                totalHours={totalHours}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {barChartData.length ? <UserPerDateChart data={barChartData} /> : ''}
                <TotalHoursTable
                    title="Total Hours per User"
                    columns={totalHoursColumns}
                    data={hoursPerUser}
                />
                <TotalHoursTable
                    title="Total Hours per Job Type"
                    columns={totalHoursColumns}
                    data={hoursPerJobType}
                />
                <TotalHoursTable
                    title="Total Hours per Milestone"
                    columns={totalHoursColumns}
                    data={hoursPerMilestone}
                    className="last"
                />
                <ProjectReports
                    pdfrows={projectReports}
                    columns={columns}
                    data={filteredData}
                    totalRecords={totalRecords}
                    empty={empty}
                />
            </React.Fragment>
        );
    }
}

export default ProjectReportsContainer;
