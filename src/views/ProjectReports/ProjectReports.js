import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import ViewWrapper from '../../components/General/ViewWrapper';
import AM2Table from '../../components/Table/AM2Table';
import Select from '../../components/Form/Select';
import DateFilter from '../../components/General/DateFilter';
import NoResults from '../../components/General/NoResults';

const ProjectReports = props => {
    const {
        data,
        columns,
        loading,
        onPageChanged,
        empty,
        projectsList,
        filterProject,
        filterChangeEvent,
        filterDepartment,
        departments,
        jobType,
        options,
        usersChartData,
        jobTypeChartData,
        milestoneChartData,
        filterJobType,
        totalRecords,
        totalHours
    } = props;

    if (projectsList) {
        projectsList.unshift({ id: '', title: 'All Projects' });
    }
    return (
        <React.Fragment>
            <ViewWrapper title="AM2 Project Reports">
                <div className="am2-filters">
                    <Select
                        name="filterProject"
                        label="Filter by Project:"
                        list={projectsList}
                        value={filterProject}
                        parentClass="form__column col-14"
                        inputChangeEvent={filterChangeEvent}
                    />
                    <Select
                        name="filterJobType"
                        label="Filter by Job Type:"
                        list={jobType}
                        value={filterJobType}
                        parentClass="form__column col-14"
                        inputChangeEvent={filterChangeEvent}
                    />
                    <Select
                        name="filterDepartment"
                        label="Filter by Department:"
                        list={departments}
                        value={filterDepartment}
                        parentClass="form__column col-14"
                        inputChangeEvent={filterChangeEvent}
                    />
                    <div className="form__column col-14">
                        <label htmlFor="filterDate">Filter by Date:</label>
                        <DateFilter inputChangeEvent={filterChangeEvent} />
                    </div>
                </div>
            </ViewWrapper>
            {usersChartData ? (
                <div className="section__content section__minicharts">
                    <div className="miniChartContainer">
                        <div className="miniChart">
                            <span className="label"> Total Hours per User</span>
                            <span className="value">{totalHours}</span>
                            <Doughnut data={usersChartData} options={options} />
                        </div>
                        <div className="miniChart">
                            <span className="label"> Total Hours per Job Type</span>
                            <span className="value">{totalHours}</span>
                            <Doughnut data={jobTypeChartData} options={options} />
                        </div>
                        <div className="miniChart">
                            <span className="label"> Total Hours per Milestones</span>
                            <span className="value">{totalHours}</span>
                            <Pie data={milestoneChartData} options={options} />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            {empty || !filterProject || data.length === 0 ? (
                <NoResults />
            ) : (
                <ViewWrapper title="Project Time Entries" className="withTopMargin">
                    <AM2Table
                        rows={data}
                        columns={columns}
                        loading={loading}
                        onPageChanged={onPageChanged}
                    />
                </ViewWrapper>
            )}
        </React.Fragment>
    );
};

ProjectReports.defaultProps = {
    departments: [
        { id: '', title: 'All Departments' },
        { id: 'wp', title: 'WordPress' },
        { id: 'ticketzone', title: 'TicketZone' },
        { id: 'greenrush', title: 'GreenRush' },
        { id: 'other', title: 'Other' }
    ],
    jobType: [
        { id: '', title: 'All Types' },
        { id: '2', title: 'Dev' },
        { id: '0', title: 'PM' },
        { id: '1', title: 'Web Design' },
        { id: '13', title: 'Graphic Design' },
        { id: '3', title: 'Personal development' },
        { id: '4', title: 'Administration' },
        { id: '5', title: 'Meeting (client)' },
        { id: '6', title: 'Meeting (internal)' },
        { id: '7', title: 'Team Management' },
        { id: '8', title: 'QA' },
        { id: '9', title: 'Support' },
        { id: '10', title: 'Preparing quote' },
        { id: '11', title: 'Content Transfer' },
        { id: '12', title: 'Junior Training' }
    ]
};

export default ProjectReports;
