import React from "react";

export default function Pagination({ totalCourses, coursesPerPage, currentPage, setCurrentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button 
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'pagination__btn pagination__btn-active' : 'pagination__btn'} 
            >
                {`${(page - 1) * 10 + 1} - ${page * 10}`}
          </button>
        );
      })}
    </div>
  );
}
