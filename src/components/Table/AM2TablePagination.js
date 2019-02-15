import React, { Component } from 'react';

class AM2TablePagination extends Component {
    range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    };

    gotoPage = page => {
        const { setCurrentPage } = this.props;
        setCurrentPage(page);
    };

    fetchPageNumbers = () => {
        const { currentPage, numOfPages, paginationNeighbours } = this.props;
        const totalNumbers = paginationNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (numOfPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - paginationNeighbours;
            const rightBound = currentPage + paginationNeighbours;
            const beforeLastPage = numOfPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = this.range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = 'LEFT';
            const rightSpillPage = 'RIGHT';

            if (leftSpill && !rightSpill) {
                const extraPages = this.range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = this.range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, numOfPages];
        }

        return this.range(1, numOfPages);
    };

    render() {
        const { currentPage } = this.props;
        const pages = this.fetchPageNumbers();
        return (
            <nav className="pagination" role="navigation" aria-label="pagination">
                <ul className="pagination-list">
                    {pages.map(page => {
                        if (page === 'LEFT')
                            return (
                                <li>
                                    <button
                                        key={page}
                                        type="button"
                                        className={`pagination-link${currentPage === page ? ' is-current' : ''}`}
                                        tabIndex={page}
                                        onClick={() => this.gotoPage(currentPage - 5)}
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                            );

                        if (page === 'RIGHT')
                            return (
                                <li>
                                    <button
                                        key={page}
                                        type="button"
                                        className={`pagination-link${currentPage === page ? ' is-current' : ''}`}
                                        tabIndex={page}
                                        onClick={() => this.gotoPage(currentPage + 5)}
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            );
                        return (
                            <li>
                                <button
                                    type="button"
                                    key={page}
                                    className={`pagination-link${currentPage === page ? ' is-current' : ''}`}
                                    tabIndex={page}
                                    onClick={() => this.gotoPage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default AM2TablePagination;

AM2TablePagination.defaultProps = {
    paginationNeighbours: 1
};
