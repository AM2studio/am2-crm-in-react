import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import AM2TableSort from './AM2TableSort';
import AM2TableFilter from './AM2TableFilter';
import AM2TablePagination from './AM2TablePagination';
import loader from './assets/loading.gif';
import './assets/style.css';

class AM2Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: '',
            sortMode: 'ASC',
            currentPage: 1,
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

    setCurrentPage = page => {
        const { onPageChanged } = this.props;
        if (onPageChanged !== undefined) {
            onPageChanged(page);
        }
        this.setState({ currentPage: page });
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
        const { columns, itemsPerPage, loading, clientFiltering, clientSorting } = this.props;
        let { rows, totalRecords } = this.props;

        const { sortedBy, sortMode, filter, currentPage } = this.state;
        // If sorting
        if (sortedBy) {
            rows = AM2TableSort(rows, sortedBy, sortMode);
        }
        // Total records needs updating
        if (filter !== undefined) {
            rows = AM2TableFilter(rows, filter);
            totalRecords = rows.length;
        }
        const showingRows = clientFiltering
            ? rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            : rows;
        if (loading) {
            return (
                <div className="am2TableLoader">
                    <img alt="loader" src={loader} width="600" height="450" />;
                </div>
            );
        }
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
                                        onClick={
                                            clientSorting
                                                ? this.sortColumn.bind(this, column.key)
                                                : undefined
                                        }
                                    >
                                        {column.title}
                                    </th>
                                ))}
                        </tr>
                        {clientFiltering && (
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
                        )}
                    </thead>
                    <tbody className="table__body">
                        {showingRows &&
                            showingRows.map(rowData => (
                                <tr key={rowData.id} className="table__row">
                                    {columns &&
                                        columns.map(element => (
                                            <td
                                                data-label={`${element.title} : `}
                                                key={element.key}
                                                className="table__cell text-left"
                                            >
                                                {this.deep(rowData, element.key)}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <AM2TablePagination
                    numOfPages={Math.ceil(totalRecords / itemsPerPage)}
                    setCurrentPage={this.setCurrentPage}
                    currentPage={currentPage}
                />
                <ReactTooltip />
            </React.Fragment>
        );
    }
}

export default AM2Table;

AM2Table.defaultProps = {
    rows: [],
    columns: [],
    itemsPerPage: 20,
    loading: false
};
