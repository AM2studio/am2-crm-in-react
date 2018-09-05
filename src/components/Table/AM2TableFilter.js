const AM2TableFilter = (rows, filter) => {
    const { column, value } = filter;
    const filteredData = rows.filter(row => row[column].toString().startsWith(value));
    return filteredData;
};

export default AM2TableFilter;
