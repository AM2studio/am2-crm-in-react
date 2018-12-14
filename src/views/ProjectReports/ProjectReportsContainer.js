import React, { Component } from 'react';
import moment from 'moment';
import randomColor from 'randomcolor';
import ProjectReports from './ProjectReports';
import WP_API from '../../data/Api';

class ProjectReportsContainer extends Component {
    constructor() {
        super();
        this.state = {
            projectReports: [],
            totalRecords: 0,
            loading: true,
            empty: false,
            projectsList: [],
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
            filterProject: '',
            filterDepartment: '',
            filterJobType: '',
            chartOptions: {
                legend: {
                    position: 'right'
                }
            }
        };
    }

    componentWillMount() {
        this.getData();
    }

    generateRandomColors = length =>
        Array(length)
            .fill()
            .map((_, i) => randomColor({ luminosity: 'bright' }));

    getData = () => {
        const { filterProject, filterDepartment, filterJobType, filterDate } = this.state;
        const byPassCache = true;
        const byPassCacheSave = true;
        const api = new WP_API();
        const projectsList = api.getPosts('projects').then(result => result.data);
        const projectReports = api
            .getPosts(
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
            )
            .then(result => {
                // console.log(result);
                const posts = result.data
                    ? result.data.map(post => ({
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
                      }))
                    : false;
                return posts
                    ? {
                          posts,
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
                          }
                      }
                    : false;
            });

        Promise.all([projectsList, projectReports]).then(values => {
            this.setState({
                projectsList: values[0],
                projectReports: values[1].posts ? values[1].posts : [],
                totalRecords: values[1].totalRecords,
                totalHours: values[1].totalHours,
                userData: values[1].userData,
                jobTypeData: values[1].jobTypeData,
                milestoneData: values[1].milestoneData,
                loading: false,
                empty: values[1].totalRecords === 0
            });
        });
    };

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: true }, () => {
            this.getData();
        });
    };

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
            milestoneData
        } = this.state;

        const columns = [
            { key: 'month', title: 'Month' },
            { key: 'user', title: 'User' },
            { key: 'billable_hours', title: 'Billable Hours' },
            { key: 'date', title: 'Date' },
            { key: 'project', title: 'Project' },
            { key: 'milestone', title: 'Milestone' },
            // { key: 'project_feature', title: 'Feature' },
            { key: 'job_type', title: 'Job Type' },
            { key: 'comment', title: 'Comment' },
            { key: 'asana_url', title: 'Asana URL' }
        ];
        return (
            <React.Fragment>
                <ProjectReports
                    columns={columns}
                    data={projectReports}
                    usersChartData={userData}
                    jobTypeChartData={jobTypeData}
                    milestoneChartData={milestoneData}
                    totalHours={totalHours}
                    totalRecords={totalRecords}
                    options={chartOptions}
                    loading={loading}
                    empty={empty}
                    projectsList={projectsList}
                    filterChangeEvent={this.filterChangeEvent}
                    filterProject={filterProject}
                    filterDepartment={filterDepartment}
                    filterJobType={filterJobType}
                />
            </React.Fragment>
        );
    }
}

export default ProjectReportsContainer;

ProjectReportsContainer.defaultProps = {
    itemsPerPage: 20
};

// Userchart example
// usersChart: {
//     labels: ['Red', 'Green', 'Yellow'],
//     datasets: [
//         {
//             data: [300, 50, 100],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
//         }
//     ]
// },
