import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { User } from '../../types/userTypes';
import useUpdateData from '../../hooks/useUpdate';
import { updateUser as updateUserApi } from '../../api/userService';
import { updateUser as updateUserAction } from '../../store/slices/userSlice';

interface EditUserFormProps {
  user: User;
  closeEditForm: () => void;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Only alphabets are allowed'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  role: Yup.string()
    .required('Role is required'),
});

const EditUserForm: React.FC<EditUserFormProps> = ({ user, closeEditForm }) => {
  const { data, loading, error, handleUpdate } = useUpdateData<User>(updateUserApi);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateUserAction(data));
      closeEditForm();
    }
  }, [data, closeEditForm, dispatch]);

  useEffect(() => {
    if (error) {
      console.log('Error updating user:', error);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: async (values) => {
      await handleUpdate(user.id, values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="firstname" className="text-lg font-semibold">
          Name
        </label>
        <input
          id="firstname"
          type="text"
          {...formik.getFieldProps('firstname')}
          className="p-2 border rounded"
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div style={{ color: 'red' }}>{formik.errors.firstname}</div>
        ) : null}
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-lg font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="flex flex-col">
        <label htmlFor="role" className="text-lg font-semibold">
          Role
        </label>
        <select
          id="role"
          {...formik.getFieldProps('role')}
          className="p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div style={{ color: 'red' }}>{formik.errors.role}</div>
        ) : null}
      </div>
      {error ? <div style={{ color: 'red' }}>Error: {error.message}</div> : null}
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading || !formik.isValid}
      >
        {loading ? 'Updating...' : 'Update User'}
      </button>
    </form>
  );
};

export default EditUserForm;
