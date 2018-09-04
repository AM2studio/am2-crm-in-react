import React, { Component } from 'react';

class AM2Table extends Component {
    deep = (obj, path) => {
        try {
            return new Function('_', `return _.${path}`)(obj); // eslint-disable-line
        } catch (e) {
            return obj[path];
        }
    };

    render() {
        const { data, columns } = this.props;
        return (
            <table className="table__table">
                <thead className="table__header">
                    <tr className="table__row">
                        {columns.map(column => (
                            <th className="table__heading text-left" key={column.key}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table__body">
                    {data.map(rowData => (
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
