import React, { Component } from 'react';
import AM2TableSort from './AM2TableSort';

class AM2Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            numPages: 1,
            sortedBy: '',
            sortMode: 'ASC'
        };
    }

    deep = (obj, path) => {
        try {
            return new Function('_', `return _.${path}`)(obj); // eslint-disable-line
        } catch (e) {
            return obj[path];
        }
    };

    sortColumn = index => {
        this.setState(prevState => ({
            sortedBy: index,
            sortMode: prevState.sortMode === 'ASC' ? 'DESC' : 'ASC'
        }));
        console.log(this.state);
    };

    render() {
        const { columns } = this.props;
        let { rows } = this.props;
        const { sortedBy, sortMode } = this.state;
        // Sorting?
        if (sortedBy) {
            rows = AM2TableSort(rows, sortedBy, sortMode);
        }

        return (
            <table className="table__table">
                <thead className="table__header">
                    <tr className="table__row">
                        {columns.map(column => (
                            <th
                                className="table__heading text-left"
                                key={column.key}
                                onClick={this.sortColumn.bind(this, column.key)}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table__body">
                    {rows.map(rowData => (
                        <tr key={rowData.id} className="table__row">
                            {columns.map(element => (
                                <td key={element.key} className="table__cell text-left">
                                    {this.deep(rowData, element.key)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AM2Table;

AM2Table.defaultProps = {
    rows: [],
    columns: [],
    pageSize: 10,
    filter: [],
    sort: []
};
