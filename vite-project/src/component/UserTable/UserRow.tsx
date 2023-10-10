import React, { useState } from 'react';
import EditUserForm from '../EditForm';
import { User } from '../../types/userTypes';
interface UserRowProps {
  id: number;
  name: string;
  email: string;
  role: string;
  onShowConfirm: (id: number) => void;
}


const UserRow: React.FC<UserRowProps> = ({ id, name, email, role, onShowConfirm }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const toggleEditForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
    };
    const closeEditForm = () => {
      setIsEditFormVisible(false);
    };
  const user: User = { id, name, email,role };

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
      {isEditFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
          <div className="bg-white p-4 rounded z-50 relative">
            <button className="text-red-500 hover:underline absolute top-0 right-0 mt-2 mr-2" onClick={toggleEditForm}>X</button>
            <EditUserForm user={user}  closeEditForm={closeEditForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserRow;
