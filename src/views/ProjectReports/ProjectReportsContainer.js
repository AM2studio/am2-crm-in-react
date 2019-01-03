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
import { SharedDataConsumer } from '../../data/SharedDataContext';
// import TopStats from './components/TopStats';
import WP_API from '../../data/Api';

const api = new WP_API();

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

    generateRandomColors = length =>
        Array(length)
            .fill()
            .map((_, i) => randomColor({ luminosity: 'bright' }));

    getData = () => {
        const { filterProject, filterCompany, filterJobType, filterDate } = this.state;
        const byPassCache = true;
        const byPassCacheSave = false;
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
                                backgroundColor: this.generateRandomColors(
                                    totals.users.hours.length
                                )
                            }
                        ]
                    },
                    jobTypeData: {
                        labels: totals.job_type.labels,
                        datasets: [
                            {
                                data: totals.job_type.hours,
                                backgroundColor: this.generateRandomColors(
                                    totals.job_type.hours.length
                                )
                            }
                        ]
                    },
                    milestoneList: {
                        labels: totals.milestones.labels,
                        datasets: [
                            {
                                data: totals.milestones.hours,
                                backgroundColor: this.generateRandomColors(
                                    totals.milestones.hours.length
                                )
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
                    projectsData: Object.values(totals.projects).map(project => ({
                        ...project
                    })),
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
            filterProject,
            filterCompany,
            filterJobType,
            empty,
            chartOptions,
            userData,
            jobTypeData,
            milestoneList,
            barChartData,
            hoursPerUser,
            hoursPerMilestone,
            hoursPerJobType,
            singleTimeEntryData,
            projectsData,
            modal
        } = this.state;

        const filteredData = projectReports.map(entry => ({
            ...entry,
            job_type: this.filterJobType(entry.job_type),
            hours: this.formatHours(entry.hours, entry.billable_hours),
            date: this.formatDate(entry.date, entry.month),
            asana_url: entry.asana_url && this.formatAsana(entry.asana_url),
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
                    <SharedDataConsumer>
                        {({ projects, companies }) => (
                            <Filters
                                projectsList={projects}
                                companiesList={companies}
                                filterChangeEvent={this.filterChangeEvent}
                                filterProject={filterProject}
                                filterCompany={filterCompany}
                                filterJobType={filterJobType}
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
                    {({ projects, companies }) => (
                        <Filters
                            projectsList={projects}
                            companiesList={companies}
                            filterChangeEvent={this.filterChangeEvent}
                            filterProject={filterProject}
                            filterCompany={filterCompany}
                            filterJobType={filterJobType}
                        />
                    )}
                </SharedDataConsumer>
                {
                    // show bottom for multiple projects only, like when filtering by company
                }
                {projectsData.length > 1 && <ProjectData data={projectsData} />}
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
                    <SharedDataConsumer>
                        {({ projects, companies }) => (
                            <TimeEntriesEdit
                                singleTimeEntryData={singleTimeEntryData}
                                handleModalClose={this.handleModalClose}
                                projects={projects}
                                users={companies}
                            />
                        )}
                    </SharedDataConsumer>
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
