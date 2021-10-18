import React from 'react';
import './Paging.css';
const Pagination = ({postPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }
        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(num => 
                        <li key={num}>
                            <a onClick={() => paginate(num)}>{num}</a>
                        </li>)
                    }
                </ul>
            </nav>
        );
};
export default Pagination;