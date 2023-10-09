import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface PaginationProps {
  users: User[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ users, currentPage, setCurrentPage }) => {
  const itemsPerPage = 5;
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex mt-4 justify-center">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 mx-1 ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-black border"}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
