const AM2TableFilter = (rows, filter) => {
    const { column, value } = filter;
    const filteredData = rows.filter(row =>
        row[column]
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
    );
    return filteredData;
};

export default AM2TableFilter;
