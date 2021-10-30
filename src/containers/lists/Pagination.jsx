import React from 'react';
import './Paging.css';
const Pagination = ({postsPerPage, totalPosts, currentPage, paginate}) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(num => 
                        (<li key={num} className="page-item">
                            <a onClick={() => paginate(num)}
                            className="page-link" style={currentPage == num ? {color: '#17a2b8'}: null}>{num}</a>
                        </li> 
                        ))}
                </ul>
            </nav>
        );
};
export default Pagination;