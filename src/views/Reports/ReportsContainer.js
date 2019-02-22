import React, { Component } from 'react';
import moment from 'moment';
import randomColor from 'randomcolor';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Reports from './Reports';
import TimeEntriesEdit from '../TimeEntries/TimeEntriesEdit';
import Filters from './components/Filters';
import MiniChart from './components/MiniChart';
import UserPerDateChart from './components/UserPerDateChart';
import TotalHoursTable from './components/TotalHoursTable';
import Loading from '../../components/General/Loading';
import AM2Modal from '../../components/General/AM2Modal';
import { SharedDataConsumer } from '../../data/SharedDataContext';
// import TopStats from './components/TopStats';
import WP_API from '../../data/Api';
import WP_AUTH from '../../data/Auth';

const auth = new WP_AUTH();
const api = new WP_API();
const permissions = auth.getPermissions();

class ReportsContainer extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            empty: false,
            totalRecords: 0,
            filterProject: '',
            filterCompany: '',
            filterJobType: '',
            filterUser: '',
            singleTimeEntryData: '',
            modal: false,
            filterDate: {
                start: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'YYYY-MM-DD'),
                end: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'YYYY-MM-DD')
            },
            userData: false,
            projectReports: [],
            barChartData: [],
            hoursPerProject: [],
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

    componentDidMount() {
        // Load data for past 30 days for users without full report access
        if (!permissions.includes('project-reports')) {
            this.getData();
        }
    }

    generateRandomColors = length =>
        Array(length)
            .fill()
            .map((_, i) => randomColor({ luminosity: 'bright' }));

    getData = () => {
        const { filterProject, filterCompany, filterJobType, filterUser, filterDate } = this.state;
        const byPassCache = true;
        const byPassCacheSave = false;
        this.setState({ loading: true });
        api.getPosts(
            'project-reports',
            {
                itemsPerPage: 20000,
                filterProject,
                filterCompany,
                filterUser,
                filterJobType,
                filterDate
            },
            byPassCache,
            byPassCacheSave
        ).then(result => {
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
                const { totals } = result.report.data;
                this.setState({
                    projectReports: posts,
                    totalRecords: result.data ? result.data.count : 0,
                    totalHours: totals.hours,
                    userData: {
                        labels: totals.users.labels,
                        datasets: [
                            {
                                data: totals.users.hours,
                                backgroundColor: this.generateRandomColors(totals.users.hours.length)
                            }
                        ]
                    },
                    projectData: {
                        labels: totals.projects.labels,
                        datasets: [
                            {
                                data: totals.projects.hours,
                                backgroundColor: this.generateRandomColors(totals.projects.hours.length)
                            }
                        ]
                    },
                    jobTypeData: {
                        labels: totals.job_type.labels,
                        datasets: [
                            {
                                data: totals.job_type.hours,
                                backgroundColor: this.generateRandomColors(totals.job_type.hours.length)
                            }
                        ]
                    },
                    milestoneList: {
                        labels: totals.milestones.labels,
                        datasets: [
                            {
                                data: totals.milestones.hours,
                                backgroundColor: this.generateRandomColors(totals.milestones.hours.length)
                            }
                        ]
                    },
                    barChartData: Object.values(totals.users.dates)
                        ? Object.values(totals.users.dates).map(bar => ({
                              ...bar,
                              backgroundColor: randomColor({ luminosity: 'bright' })
                          }))
                        : [],
                    empty: result.totalRecords === 0,
                    hoursPerUser: Object.values(totals.users.list).map(user => ({
                        ...user
                    })),
                    hoursPerMilestone: Object.values(totals.milestones.list).map(milestone => ({
                        ...milestone
                    })),
                    hoursPerJobType: Object.values(totals.job_type.list).map(jobtype => ({
                        ...jobtype
                    })),
                    hoursPerProject: Object.values(totals.projects.list).map(project => ({
                        ...project
                    })),
                    loading: false
                });
            }
        });
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({
            projectReports: [],
            barChartData: [],
            hoursPerUser: [],
            hoursPerJobType: [],
            hoursPerMilestone: [],
            hoursPerProject: [],
            userData: false,
            [name]: value
        });
    };

    addLodingBar = (data, totalHours) =>
        data.map(obj => ({
            ...obj,
            billable: (
                <div className="progressHolder">
                    {obj.billable}
                    <div className="progress">
                        <div style={{ width: `${(obj.billable / totalHours) * 100}%` }} />
                    </div>
                </div>
            )
        }));

    formatHours = (hour, billable_hours) => <p data-tip={`billable: ${billable_hours}`}>{hour}</p>; // eslint-disable-line camelcase

    formatDate = (date, month) => <p data-tip={month}>{date}</p>;

    filterJobType = jobType => {
        const jobTypeClass = jobType.replace(/[^a-zA-Z]+/g, '');
        return <span className={`jobtype ${jobTypeClass}`}>{jobType}</span>;
    };

    formatAsana = asana => (
        <a href={asana} rel="noopener noreferrer" target="_blank" data-tip={asana}>
            {asana}
        </a>
    );

    actionBtns = id => (
        <React.Fragment>
            <button
                type="button"
                className="button is-primary"
                onClick={e => {
                    this.editTimeEntry(e, id);
                }}
            >
                <FaPencilAlt />
            </button>
            <button
                type="button"
                className="button is-danger"
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
        api.get('time-entry', id, entryDataToFetch).then(result => {
            this.setState({ singleTimeEntryData: result });
        });
    };

    deleteTimeEntry = (e, id) => {
        api.delete('time-entry', id).then(result => {
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
            filterUser,
            filterProject,
            filterCompany,
            filterJobType,
            empty,
            chartOptions,
            userData,
            projectData,
            jobTypeData,
            milestoneList,
            barChartData,
            hoursPerUser,
            hoursPerMilestone,
            hoursPerJobType,
            singleTimeEntryData,
            hoursPerProject,
            modal
        } = this.state;
        console.log(barChartData);
        const filteredData = projectReports.map(entry => ({
            ...entry,
            job_type: this.filterJobType(entry.job_type),
            hours: this.formatHours(entry.hours, entry.billable_hours),
            date: this.formatDate(entry.date, entry.month),
            asana_url: entry.asana_url && this.formatAsana(entry.asana_url),
            buttons: this.actionBtns(entry.id)
        }));

        const filteredHoursPerProject = this.addLodingBar(hoursPerProject, totalHours);
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

        const totalHoursColumns = [{ key: 'name', title: 'User' }, { key: 'billable', title: 'Hours' }];
        if (loading) {
            return (
                <React.Fragment>
                    <SharedDataConsumer>
                        {({ projects, companies, users }) => (
                            <Filters
                                projectsList={projects}
                                companiesList={companies}
                                usersList={users}
                                filterUser={filterUser}
                                filterChangeEvent={this.filterChangeEvent}
                                filterProject={filterProject}
                                filterCompany={filterCompany}
                                filterJobType={filterJobType}
                                getFilteredData={this.getData}
                                loading={loading}
                                permission={!!permissions.includes('project-reports')}
                            />
                        )}
                    </SharedDataConsumer>
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
                <SharedDataConsumer>
                    {({ projects, companies, users }) => (
                        <Filters
                            projectsList={projects}
                            companiesList={companies}
                            usersList={users}
                            filterUser={filterUser}
                            filterChangeEvent={this.filterChangeEvent}
                            filterProject={filterProject}
                            filterCompany={filterCompany}
                            filterJobType={filterJobType}
                            getFilteredData={this.getData}
                            loading={loading}
                            permission={!!permissions.includes('project-reports')}
                        />
                    )}
                </SharedDataConsumer>
                {
                    // show bottom for multiple projects only, like when filtering by company
                }
                {userData ? (
                    <div className="section__content section__minicharts">
                        <div
                            className={
                                filterCompany ? 'miniChartContainer miniChartContainer--company' : 'miniChartContainer'
                            }
                        >
                            {filterProject === '' && (
                                <MiniChart
                                    data={projectData}
                                    title="Total Hours per Project"
                                    totalHours={totalHours}
                                    options={chartOptions}
                                />
                            )}
                            {!!permissions.includes('project-reports') && filterUser === '' && (
                                <MiniChart
                                    data={userData}
                                    title="Total Hours per User"
                                    totalHours={totalHours}
                                    options={chartOptions}
                                />
                            )}
                            {filterJobType === '' && (
                                <MiniChart
                                    data={jobTypeData}
                                    title="Total Hours per Job Type"
                                    totalHours={totalHours}
                                    options={chartOptions}
                                />
                            )}
                            <MiniChart
                                data={milestoneList}
                                title="Total Hours per Milestone"
                                totalHours={totalHours}
                                options={{
                                    legend: {
                                        position: 'bottom'
                                    },
                                    tooltips: {
                                        intersect: false
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {barChartData.length ? <UserPerDateChart data={barChartData} /> : ''}
                <div className="tableListContainer">
                    {filterProject === '' && (
                        <TotalHoursTable
                            title="Total Hours per Project"
                            columns={totalHoursColumns}
                            data={filteredHoursPerProject}
                        />
                    )}
                    {!!permissions.includes('project-reports') && filterUser === '' && (
                        <TotalHoursTable
                            title="Total Hours per User"
                            columns={totalHoursColumns}
                            data={filteredHoursPerUser}
                        />
                    )}
                    {filterJobType === '' && (
                        <TotalHoursTable
                            title="Total Hours per Job Type"
                            columns={totalHoursColumns}
                            data={filteredHoursPerJobType}
                        />
                    )}
                    <TotalHoursTable
                        title="Total Hours per Milestone"
                        columns={totalHoursColumns}
                        data={filteredHoursPerMilestone}
                        className="last"
                    />
                </div>
                <Reports
                    pdfrows={projectReports}
                    columns={entriesColumns}
                    data={filteredData}
                    totalRecords={totalRecords}
                    empty={empty}
                />
                <AM2Modal open={modal} handleModalClose={this.handleModalClose}>
                    <SharedDataConsumer>
                        {({ projects, users }) => (
                            <TimeEntriesEdit
                                singleTimeEntryData={singleTimeEntryData}
                                handleModalClose={this.handleModalClose}
                                projects={projects}
                                users={users}
                            />
                        )}
                    </SharedDataConsumer>
                </AM2Modal>
            </React.Fragment>
        );
    }
}
ReportsContainer.defaultProps = {
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
export default ReportsContainer;
