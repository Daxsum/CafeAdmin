import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
const Pagination = ({ itemSize, pageSize, pageOnChange, currentPage }) => {
  const pageCount = itemSize / pageSize;
  const pages = _.range(1, pageCount + 1);
  if (pageCount <= 1) return null;
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                href="#//"
                onClick={() => pageOnChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
Pagination.propTypes = {
  itemSize: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  pageOnChange: propTypes.func.isRequired,
};

export default Pagination;
