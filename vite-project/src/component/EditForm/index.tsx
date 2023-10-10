import React, { useState, useEffect } from "react";
import { User } from "../../types/userTypes";
interface EditUserFormProps {
  user: User;
  closeEditForm: () => void;
}



const EditUserForm: React.FC<EditUserFormProps> = ({ user, closeEditForm }) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  useEffect(() => {
    console.log("Current state of updatedUser:", updatedUser);
  }, [updatedUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting:", updatedUser); 
    closeEditForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-lg font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={updatedUser.name}
          onChange={(e) => {
            console.log("Before updating name:", updatedUser.name); 
            setUpdatedUser({ ...updatedUser, name: e.target.value });
          }}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-lg font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={updatedUser.email}
          onChange={(e) => {
            console.log("Before updating email:", updatedUser.email); 
            setUpdatedUser({ ...updatedUser, email: e.target.value });
          }}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="role" className="text-lg font-semibold">
          Role
        </label>
        <select
          id="role"
          value={updatedUser.role}
          onChange={(e) => {
            console.log("Before updating role:", updatedUser.role); 
            setUpdatedUser({ ...updatedUser, role: e.target.value });
          }}
          className="p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Update User
      </button>
    </form>
  );
};

export default EditUserForm;
