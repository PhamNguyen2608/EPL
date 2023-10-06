import React from 'react';

interface UserRowProps {
  id: number;
  name: string;
  email: string;
  role: string;
  onShowConfirm: () => void;
  
}

const UserRow: React.FC<UserRowProps> = ({ id, name, email, role, onShowConfirm }) => {
  return (
    <tr> 
      <td className="py-2 px-3 border-b border-gray-200">{id}</td>
      <td className="py-2 px-3 border-b border-gray-200">{name}</td>
      <td className="py-2 px-3 border-b border-gray-200">{email}</td>
      <td className="py-2 px-3 border-b border-gray-200">{role}</td>
      <td className="py-2 px-3 border-b border-gray-200">
        <button className="text-blue-500 hover:underline">Edit</button>
        <button className="text-red-500 hover:underline ml-4" onClick={onShowConfirm}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
