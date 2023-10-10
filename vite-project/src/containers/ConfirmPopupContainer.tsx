import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConfirm } from '../store/slices/confirmSlice';
import ConfirmPopup from '../component/ConfirmPopup/ConfirmPopup';
import { RootState } from '../store'; 
import { deleteUser } from '../api/userService';
import useDeleteData from '../hooks/useDelete';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ConfirmPopupContainerProps {
  userIdToDelete: number | null;
  users: User[]; 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ConfirmPopupContainer: React.FC<ConfirmPopupContainerProps> = ({ userIdToDelete, users, setUsers }) => {
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm);

  const deleteUserWrapper = (id: number | string) => {
    if (typeof id === 'number') {
      return deleteUser(id);
    } else {
      throw new Error("ID must be a number");
    }
  }
  
  const { loading, error, handleDelete } = useDeleteData(deleteUserWrapper);
  

  const handleClose = () => {
    dispatch(hideConfirm());
  };

  const handleConfirm = async () => {
    if (userIdToDelete !== null) {
      await handleDelete(userIdToDelete);
      const updatedUsers = users.filter(user => user.id !== userIdToDelete);
      setUsers(updatedUsers);
      console.log(`Deleted user with ID: ${userIdToDelete}`);
    }
    dispatch(hideConfirm());
  };

  return (
    <ConfirmPopup
      isPopupVisible={isPopupVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
      loading={loading}
      error={error}
    />
  );
};


export default ConfirmPopupContainer;
