import React from "react";

const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
  pokemonsPerPage,
  totalPokemons,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const previous = () => {
    console.log("Previous");
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const next = () => {
    console.log("Next");
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          {/* <a onClick={previous} href="!#" className="page-link"> */}
          <a onClick={previous} className="page-link">
            prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {/* <a onClick={() => paginate(number)} href="!#" className="page-link"> */}
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          {/* <a onClick={next} href="!#" className="page-link"> */}
          <a onClick={next} className="page-link">
            next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
