import React, { Component } from 'react';
import ViewWrapper from '../../../components/General/ViewWrapper';
import AM2Table from '../../../components/Table/AM2Table';

export default class extends Component {
    render() {
        const columns = [
            { key: 'name', title: 'User' },
            { key: 'billable', title: 'Hours' },
            { key: 'milestones', title: 'Milestones' }
        ];
        const { data } = this.props;
        return (
            <ViewWrapper title="Hours per Projects and Milestones" className="withTopMargin">
                <AM2Table rows={data} columns={columns} />
            </ViewWrapper>
        );
    }
}
