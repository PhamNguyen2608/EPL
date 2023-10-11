import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConfirm } from '../store/slices/confirmSlice';
import ConfirmPopup from '../component/ConfirmPopup/ConfirmPopup';
import { RootState } from '../store'; 
import useDeleteData from '../hooks/useDelete';
import { deleteUser as deleteUserApi } from '../api/userService';
import { deleteUser } from '../store/slices/userSlice';

interface ConfirmPopupContainerProps {
  userIdToDelete: number | null;
}

const ConfirmPopupContainer: React.FC<ConfirmPopupContainerProps> = ({ userIdToDelete }) => {
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm);

  const deleteUserWrapper = (id: number | string) => {
    if (typeof id === 'number') {
      return deleteUserApi(id);
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
      dispatch(deleteUser(userIdToDelete)); 
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
