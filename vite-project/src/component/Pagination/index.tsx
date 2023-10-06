
import React, { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center my-4">
      {/* Button for previous page */}
      <button
        className="mx-1 px-3 py-2 border rounded-lg text-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Trước
      </button>

      {/* Buttons for individual pages */}
      {[...Array(totalPages).keys()].map((page, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-2 border rounded-lg text-sm ${currentPage === page + 1 ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setCurrentPage(page + 1)}
        >
          {page + 1}
        </button>
      ))}

     {/* button next page*/}
      <button
        className="mx-1 px-3 py-2 border rounded-lg text-sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;
