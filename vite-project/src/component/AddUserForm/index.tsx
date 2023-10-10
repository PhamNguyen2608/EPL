import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  role: string;
}

interface AddUserFormProps {
    handleToggleAddUserForm: () => void;
    
  
  }

  const AddUserForm: React.FC<AddUserFormProps> = ({ handleToggleAddUserForm, handleAddNewUser }) => {
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      role: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log('Form data submitted', formData);
      handleAddNewUser(formData);  
      handleToggleAddUserForm();  
    };

//   const handleToggleForm = () => {
//     setIsFormVisible(!isFormVisible);
//   };

  return (
    <div>
     
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> 
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">Add New User</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
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
              <input
                id="role"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md border"
              />
            </div>
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
