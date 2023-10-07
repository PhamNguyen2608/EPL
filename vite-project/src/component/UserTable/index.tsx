import React from 'react';
import UserRow from './UserRow'; // Import UserRow component

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onShowConfirm: (id: number) => void;
  currentPage: number;  // Thêm prop này
  totalPages: number;  // Thêm prop này
  setCurrentPage: (page: number) => void;
  handleUpdateUser: (updatedUser: User) => void; 
}

const UserTable: React.FC<UserTableProps> = ({ users, onShowConfirm,handleUpdateUser  }) => {  // Thêm onShowConfirm vào đây
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
          {users.slice(0, 20).map((user) => (
            <UserRow 
              key={user.id} 
              id={user.id} 
              name={user.name} 
              email={user.email} 
              role={user.role} 
              onShowConfirm={onShowConfirm}
              handleUpdateUser={handleUpdateUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
