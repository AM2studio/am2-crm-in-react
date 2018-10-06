import React, { Component } from 'react';
import AM2TableSort from './AM2TableSort';
import AM2TableFilter from './AM2TableFilter';
import AM2TablePagination from './AM2TablePagination';

class AM2Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            sortedBy: '',
            sortMode: 'ASC',
            filter: undefined
        };
    }

    onPageChanged = page => {
        const { onPageChanged } = this.props;
        this.setState(() => ({ currentPage: page }));
        onPageChanged(page);
    };

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
        const { filter } = this.state;
        // Clear other input element
        if (filter && filter.column !== key) {
            document.getElementsByName(filter.column)[0].value = '';
        }

        if (val) {
            this.setState(() => ({
                filter: { column: key, value: val }
            }));
        } else {
            // Clear state when input is removed
            this.setState({ filter: undefined });
        }
    };

    render() {
        const { columns, itemsPerPage } = this.props;
        let { rows } = this.props;
        const { sortedBy, sortMode, filter, currentPage } = this.state;
        // Sorting?
        if (sortedBy) {
            rows = AM2TableSort(rows, sortedBy, sortMode);
        }
        if (filter !== undefined) {
            rows = AM2TableFilter(rows, filter);
        }

        rows = rows.slice(0, itemsPerPage);

        return (
            <React.Fragment>
                <table className="table__table">
                    <thead className="table__header">
                        <tr className="table__row">
                            {columns &&
                                columns.map(column => (
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
                            {columns &&
                                columns.map(column => (
                                    <th key={column.key}>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            className="input__standard"
                                            name={column.key}
                                            onChange={e => this.filterColumn(e, column.key)}
                                        />
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {rows &&
                            rows.map(rowData => (
                                <tr key={rowData.id} className="table__row">
                                    {columns &&
                                        columns.map(element => (
                                            <td key={element.key} className="table__cell text-left">
                                                {this.deep(rowData, element.key)}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <AM2TablePagination
                    numOfPages={Math.ceil(rows.length / itemsPerPage)}
                    currentPage={currentPage}
                    onPageChanged={this.onPageChanged}
                />
            </React.Fragment>
        );
    }
}

export default AM2Table;

AM2Table.defaultProps = {
    rows: [],
    columns: [],
    itemsPerPage: 10
};
