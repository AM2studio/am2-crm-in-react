import React, { Component } from 'react';
import AM2TableSort from './AM2TableSort';
import AM2TableFilter from './AM2TableFilter';

class AM2Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1, // eslint-disable-line
            numPages: 1, // eslint-disable-line
            sortedBy: '',
            sortMode: 'ASC',
            filter: undefined
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
    };

    filterColumn = (event, key) => {
        const val = event.target.value;
        if (val) {
            this.setState(() => ({
                filter: { column: key, value: val }
            }));
        } else {
            this.setState({ filter: undefined });
        }

        console.log(this.state);
    };

    render() {
        const { columns } = this.props;
        let { rows } = this.props;
        const { sortedBy, sortMode, filter } = this.state;
        // Sorting?
        if (sortedBy) {
            rows = AM2TableSort(rows, sortedBy, sortMode);
        }
        if (filter !== undefined) {
            rows = AM2TableFilter(rows, filter);
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
                    <tr className="table__row">
                        {columns.map(column => (
                            <th key={column.key}>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    className="table__heading text-left"
                                    name={column.key}
                                    onChange={e => this.filterColumn(e, column.key)}
                                />
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
    itemsPerPage: 10
};
