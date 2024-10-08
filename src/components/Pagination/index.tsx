import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles/index.scss";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const Pagination: React.FC<PaginationProps> = ({
  totalItems = 1,
  itemsPerPage = 10,
  itemOffset = 0,
  onPageChange = (newOffset) => {},
}) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  //const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    onPageChange(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
        pageClassName="p page-item"
        activeClassName="pagination-active"
        nextClassName="pagination-arrow"
        previousClassName="pagination-arrow"
        disabledClassName="pagination-arrow-disabled"
      />
    </>
  );
};

export default Pagination;

interface PaginationProps {
  itemOffset: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newOffset: number) => void;
}
