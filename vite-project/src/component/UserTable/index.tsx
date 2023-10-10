import React, { useState, useEffect } from 'react';
import UserRow from './UserRow'; // Import UserRow component
import Pagination from '../Pagination';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onShowConfirm: (id: number) => void;
 
}

const UserTable: React.FC<UserTableProps> = ({ users, onShowConfirm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    if (currentUsers.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [users, currentPage, itemsPerPage]);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="overflow-auto h-[500px] w-[800px] rounded-lg shadow-lg bg-white">
      <table className="min-w-full">
      <thead>
          <tr>
            <th className="text-left py-2 px-3 border-b border-gray-200">ID</th>
            <th className="text-left py-2 px-3 border-b border-gray-200">Name</th>
            <th className="text-left py-2 px-3 border-b border-gray-200">Email</th>
            <th className="text-left py-2 px-3 border-b border-gray-200">Role</th>
            <th className="text-left py-2 px-3 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserRow 
              key={user.id} 
              id={user.id} 
              name={user.name} 
              email={user.email} 
              role={user.role} 
              onShowConfirm={onShowConfirm}
              
            />
          ))}
        </tbody>
      </table>
      <Pagination 
        users={users} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default UserTable;
