import React from "react";

export default function Pagination(props) {
  const pageButtons = [1, 2, 3, 4, 5].map((btn) => (
    <button
      onClick={(e) => {
        props.changeCurrentPage(e.target.textContent);
      }}
      className="pagination--buttons"
    >
      {btn}
    </button>
  ));

  return <div className="pagination">{pageButtons}</div>;
}
