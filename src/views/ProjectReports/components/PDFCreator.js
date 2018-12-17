import React, { Component } from 'react';
import JSPDF from 'jspdf';
import 'jspdf-autotable';

class PDFCreator extends Component {
    downloadPDF = () => {
        const { options, columns, rows } = this.props;
        const filteredRows = this.filterColumns(rows);
        const doc = new JSPDF(options, 'pt');
        doc.autoTable(columns, filteredRows);
        doc.save('table.pdf');
    };

    filterUserUTF = user => user.replace('ć', 'c');

    filterColumns = rows =>
        rows.map(row => ({
            ...row,
            user: this.filterUserUTF(row.user)
        }));

    render() {
        return (
            <button
                type="button"
                className="button button--primary button--pdf"
                onClick={this.downloadPDF}
            >
                Download PDF
            </button>
        );
    }
}

export default PDFCreator;

PDFCreator.defaultProps = {
    options: {
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 5,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
    },
    columns: [
        { key: 'user', title: 'User' },
        { key: 'billable_hours', title: 'Billable Hours' },
        { key: 'date', title: 'Date' },
        { key: 'project', title: 'Project' },
        { key: 'milestone', title: 'Milestone' },
        // { key: 'project_feature', title: 'Feature' },
        { key: 'job_type', title: 'Job Type' },
        { key: 'comment', title: 'Comment' }
        // { key: 'asana_url', title: 'Asana URL' }
    ]
};
