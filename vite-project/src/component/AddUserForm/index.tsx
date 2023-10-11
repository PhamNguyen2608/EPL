import React, { useState, ChangeEvent, FormEvent } from 'react';
import useAddData from '../../hooks/useAdd';
import { addUser } from '../../api/userService';

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

  const { error, isAdded, handleAdd } = useAddData(addUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleAdd(formData);
    if (isAdded) {
      console.log('User added successfully');
      handleToggleAddUserForm();
    } else if (error) {
      console.log('Error adding user:', error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl mb-4">Add New User</h2>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-md border"
            />
          </div>
          {/* other input fields remain unchanged */}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add
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
