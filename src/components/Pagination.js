import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const maxPageNumbersToShow = 5;

    const generatePageNumbers = () => {
        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push('...');
            }
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }
    };

    generatePageNumbers();

    return (
        <nav className="mb-5">
            <ul className="pagination mt-3 justify-content-center">
                {pageNumbers.map((number, index) => (
                    <li key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        {number === '...' ? (
                            <span className="page-link">...</span>
                        ) : (
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
