import React from 'react';

interface PaginationProps {
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalItems: number;
  prevLink: unknown;
  nextLink: unknown;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, handlePageChange, totalItems }) => {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex mt-4 justify-center">
     
      <button 
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-4 py-2 mx-1 ${currentPage === 1 ? "bg-gray-300 text-white" : "bg-white text-black border"}`}
      >
        Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-4 py-2 mx-1 ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-black border"}`}
        >
          {number}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 mx-1 ${currentPage === totalPages ? "bg-gray-300 text-white" : "bg-white text-black border"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
