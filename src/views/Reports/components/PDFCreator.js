import React, { Component } from 'react';
import JSPDF from 'jspdf';
import 'jspdf-autotable';

class PDFCreator extends Component {
    downloadPDF = () => {
        const { options, columns, rows } = this.props;
        const filteredRows = this.filterColumns(rows);
        const doc = new JSPDF(options, 'pt');
        const tableOptions = {
            body: filteredRows,
            columns,
            bodyStyles: { valign: 'top' },
            styles: { overflow: 'linebreak', cellWidth: 'wrap' },
            columnStyles: {
                job_type: {
                    cellWidth: 10
                },
                milestone: {
                    cellWidth: 25
                },
                project: {
                    cellWidth: 25
                },
                comment: {
                    cellWidth: 150
                }
            }
        };
        doc.autoTable(tableOptions);
        doc.save('table.pdf');
    };

    filterColumns = rows =>
        rows.reduce((filtered, current) => {
            filtered.push({
                user: current.user.replace('ć', 'c'),
                billable_hours: current.billable_hours,
                date: current.date,
                project: current.project,
                milestone: current.milestone,
                job_type: current.job_type,
                comment: current.comment
            });
            return filtered;
        }, []);

    render() {
        return (
            <button type="button" className="button is-info button--pdf" onClick={this.downloadPDF}>
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
        fontSize: 5,
        compress: true,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
    },
    columns: [
        { dataKey: 'user', header: 'User' },
        { dataKey: 'billable_hours', header: 'Billable Hours' },
        { dataKey: 'date', header: 'Date' },
        { dataKey: 'project', header: 'Project' },
        { dataKey: 'milestone', header: 'Milestone' },
        // { dataKey: 'project_feature', header: 'Feature' },
        { dataKey: 'job_type', header: 'Job Type' },
        { dataKey: 'comment', header: 'Comment' }
        // { key: 'asana_url', title: 'Asana URL' }
    ]
};
