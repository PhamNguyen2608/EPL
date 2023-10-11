import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slices/userSlice';
import { RootState } from '../../store';
import { User } from '../../types/userTypes';
import useAddData from '../../hooks/useAdd';
import {addUser as addUserAPI } from '../../api/userService'
interface FormData {
  firstname: string;
  email: string;
  role: string;
}

interface AddUserFormProps {
  handleToggleAddUserForm: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ handleToggleAddUserForm }) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    email: '',
    role: ''
  });

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user.users);

  const { loading, error, isAdded, addedData, handleAdd } = useAddData<User>(addUserAPI);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      firstname: formData.firstname,
      lastname: '',
      email: formData.email,
      role: formData.role,
      name: ''
    };

    await handleAdd(newUser);

    if (isAdded && addedData) {
      dispatch(addUser(addedData));
      handleToggleAddUserForm();
    }

    if (error) {
      console.log("error",error)
      // Handle error appropriately, maybe display it on the UI.
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl mb-4">Add New User</h2>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">Firstname</label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-md border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-md border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-md border"
            >
              <option value="" disabled>Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
  {loading ? 'Adding...' : 'Add'}
</button>

          <button type="button" onClick={handleToggleAddUserForm} className="ml-4 bg-red-500 text-white p-2 rounded">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
