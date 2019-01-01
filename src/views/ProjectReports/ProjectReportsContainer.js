import React, { Component } from 'react';
import moment from 'moment';
import randomColor from 'randomcolor';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ProjectReports from './ProjectReports';
import TimeEntriesEdit from '../TimeEntries/TimeEntriesEdit';
import Filters from './components/Filters';
import MiniChart from './components/MiniChart';
import UserPerDateChart from './components/UserPerDateChart';
import TotalHoursTable from './components/TotalHoursTable';
import Loading from '../../components/General/Loading';
import AM2Modal from '../../components/General/AM2Modal';
import ProjectData from './components/ProjectsList';
// import TopStats from './components/TopStats';
import WP_API from '../../data/Api';

class ProjectReportsContainer extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            empty: false,
            totalRecords: 0,
            filterProject: '',
            filterCompany: '',
            filterJobType: '',
            singleTimeEntryData: '',
            modal: false,
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
            companiesList: [],
            usersList: [],
            projectReports: [],
            barChartData: [],
            projectsData: [],
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
        const projectsList = api.getPosts('projects').then(result => result.data);
        const companiesList = api.getPosts('companies').then(result => result.data);
        const usersList = api.getPosts('users').then(result => result.data);

        Promise.all([companiesList, projectsList, usersList]).then(result => {
            this.setState({
                companiesList: result[0],
                projectsList: result[1],
                usersList: result[2]
            });
        });
    }

    generateRandomColors = length =>
        Array(length)
            .fill()
            .map((_, i) => randomColor({ luminosity: 'bright' }));

    getData = () => {
        const { filterProject, filterCompany, filterJobType, filterDate } = this.state;
        const byPassCache = true;
        const byPassCacheSave = false;
        const api = new WP_API();
        api.getPosts(
            'project-reports',
            {
                itemsPerPage: 20000,
                filterProject,
                filterCompany,
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
                    milestoneList: {
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
                    projectsData: Object.values(result.report.data.totals.projects).map(
                        project => ({
                            ...project
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
                projectReports: [],
                barChartData: [],
                hoursPerUser: [],
                hoursPerJobType: [],
                hoursPerMilestone: [],
                projectsData: [],
                userData: false,
                [name]: value,
                loading: true
            },
            () => {
                this.getData();
            }
        );
    };

    addLodingBar = (data, totalHours) =>
        data.map(obj => ({
            ...obj,
            billable: (
                <div className="loaderHolder">
                    {obj.billable}
                    <div className="loader">
                        <div style={{ width: `${(obj.billable / totalHours) * 100}%` }} />
                    </div>
                </div>
            )
        }));

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

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button--table button--table--edit"
                onClick={e => {
                    this.editTimeEntry(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button--table button--table--delete"
                onClick={e => {
                    this.deleteTimeEntry(e, id);
                }}
            >
                <FaTrashAlt />
            </button>
        </React.Fragment>
    );

    editTimeEntry = (e, id) => {
        this.setState({ modal: true });
        const { entryDataToFetch } = this.props;
        const data = new WP_API();
        data.get('time-entry', id, entryDataToFetch).then(result => {
            this.setState({ singleTimeEntryData: result });
        });
    };

    deleteTimeEntry = (e, id) => {
        const data = new WP_API();
        data.delete('time-entry', id).then(result => {
            // Instead of another API call, remove from array?
            this.getEntries(true);
        });
    };

    handleModalClose = update => {
        this.setState({ modal: false });
        if (update === true) {
            this.getData();
        }
    };

    render() {
        const {
            projectReports,
            totalHours,
            totalRecords,
            loading,
            filterProject,
            filterCompany,
            filterJobType,
            empty,
            projectsList,
            companiesList,
            chartOptions,
            userData,
            jobTypeData,
            milestoneList,
            barChartData,
            hoursPerUser,
            hoursPerMilestone,
            hoursPerJobType,
            usersList,
            singleTimeEntryData,
            projectsData,
            modal
        } = this.state;

        const filteredData = projectReports.map(entry => ({
            ...entry,
            job_type: this.filterJobType(entry.job_type),
            hours: this.hours(entry.hours, entry.billable_hours),
            date: this.date(entry.date, entry.month),
            asana_url: entry.asana_url && this.asana(entry.asana_url),
            buttons: this.actionBtns(entry.id)
        }));

        const filteredHoursPerUser = this.addLodingBar(hoursPerUser, totalHours);
        const filteredHoursPerMilestone = this.addLodingBar(hoursPerMilestone, totalHours);
        const filteredHoursPerJobType = this.addLodingBar(hoursPerJobType, totalHours);

        const entriesColumns = [
            { key: 'user', title: 'User' },
            { key: 'billable_hours', title: 'Billable Hours' },
            { key: 'date', title: 'Date' },
            { key: 'project', title: 'Project' },
            { key: 'milestone', title: 'Milestone' },
            { key: 'job_type', title: 'Job Type' },
            { key: 'comment', title: 'Comment' },
            { key: 'asana_url', title: 'Asana URL' },
            { key: 'buttons', title: 'Action' }
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
                        companiesList={companiesList}
                        filterChangeEvent={this.filterChangeEvent}
                        filterProject={filterProject}
                        filterCompany={filterCompany}
                        filterJobType={filterJobType}
                    />
                    <Loading />
                </React.Fragment>
            );
        }
        // Commented out for now, move to render to show.
        // {hoursPerMilestone.map(milestone => (
        //     <TopStats milestoneData={milestone} />
        // ))}
        return (
            <React.Fragment>
                <Filters
                    projectsList={projectsList}
                    companiesList={companiesList}
                    filterChangeEvent={this.filterChangeEvent}
                    filterProject={filterProject}
                    filterCompany={filterCompany}
                    filterJobType={filterJobType}
                />
                {
                    // show bottom when multiple projects only
                }
                {projectsData.length > 1 &&
                    projectsData.map(project => (
                        <ProjectData
                            projectData={project.milestones}
                            name={project.name}
                            billable={project.billable}
                        />
                    ))}
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
                                data={milestoneList}
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
                    data={filteredHoursPerUser}
                />
                <TotalHoursTable
                    title="Total Hours per Job Type"
                    columns={totalHoursColumns}
                    data={filteredHoursPerJobType}
                />
                <TotalHoursTable
                    title="Total Hours per Milestone"
                    columns={totalHoursColumns}
                    data={filteredHoursPerMilestone}
                    className="last"
                />
                <ProjectReports
                    pdfrows={projectReports}
                    columns={entriesColumns}
                    data={filteredData}
                    totalRecords={totalRecords}
                    empty={empty}
                />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <TimeEntriesEdit
                        singleTimeEntryData={singleTimeEntryData}
                        handleModalClose={this.handleModalClose}
                        projects={projectsList}
                        users={usersList}
                    />
                </AM2Modal>
            </React.Fragment>
        );
    }
}
ProjectReportsContainer.defaultProps = {
    entryDataToFetch: [
        'billable_hours',
        'user_id',
        'milestones',
        'milestone',
        'comment',
        'company',
        'date',
        'hours',
        'id',
        'is_billable',
        'job_type',
        'project',
        'project_feature',
        'asana_url'
    ]
};
export default ProjectReportsContainer;
