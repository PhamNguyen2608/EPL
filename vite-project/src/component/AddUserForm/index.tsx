import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slices/userSlice';
import { RootState } from '../../store';
import { User } from '../../types/userTypes';
import useAddData from '../../hooks/useAdd';
import { addUser as addUserAPI } from '../../api/userService';

interface AddUserFormProps {
  handleToggleAddUserForm: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ handleToggleAddUserForm }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const { loading, error, handleAdd } = useAddData<User>(addUserAPI);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      email: '',
      role: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      role: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

      const newUser: User = {
        id: newId,
        firstname: values.firstname,
        lastname: '',
        email: values.email,
        role: values.role,
        name: ''
      };

      await handleAdd(newUser, (addedData) => {
        dispatch(addUser(addedData));
        handleToggleAddUserForm();
      });

      if (error) {
        console.log("error", error);
      }
    },
  });
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl mb-4">Add New User</h2>

          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              id="firstname"
              type="text"
              {...formik.getFieldProps('firstname')}
              className="mt-1 p-2 w-full rounded-md border"
            />
              {formik.touched.firstname && formik.errors.firstname ? <div style={{ color: 'red' }}>{formik.errors.firstname}</div> : null}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="mt-1 p-2 w-full rounded-md border"
            />
             {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
            <select
              id="role"
              {...formik.getFieldProps('role')}
              className="mt-1 p-2 w-full rounded-md border"
            >
              <option value="" disabled>Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div style={{ color: 'red' }}>{formik.errors.role}</div>
            ) : null}
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
