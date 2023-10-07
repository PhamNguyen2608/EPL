import React, { useState } from 'react';
import EditUserForm from '../EditForm';  // Import the EditUserForm component

interface UserRowProps {
  id: number;
  name: string;
  email: string;
  role: string;
  onShowConfirm: (id: number) => void;
  handleUpdateUser: (updatedUser: User) => void; 
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserRow: React.FC<UserRowProps> = ({ id, name, email, role, onShowConfirm, handleUpdateUser }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const toggleEditForm = () => {
  
    setIsEditFormVisible(!isEditFormVisible);
  };

  const user: User = { id, name, email, role };

  return (
    <>
      <tr> 
        <td className="py-2 px-3 border-b border-gray-200">{id}</td>
        <td className="py-2 px-3 border-b border-gray-200">{name}</td>
        <td className="py-2 px-3 border-b border-gray-200">{email}</td>
        <td className="py-2 px-3 border-b border-gray-200">{role}</td>
        <td className="py-2 px-3 border-b border-gray-200">
          <button className="text-blue-500 hover:underline" onClick={toggleEditForm}>Edit</button>
          <button className="text-red-500 hover:underline ml-4" onClick={() => onShowConfirm(id)}>Delete</button>
        </td>
      </tr>
      {isEditFormVisible && <EditUserForm user={user} handleUpdateUser={handleUpdateUser} />}
    </>
  );
};

export default UserRow;
