import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConfirm } from '../store/slices/confirmSlice';
import ConfirmPopup from '../component/ConfirmPopup/ConfirmPopup';
import { RootState } from '../store'; 

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

  const handleClose = () => {
    dispatch(hideConfirm());
  };

  const handleConfirm = () => {
    if (userIdToDelete !== null) {
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
    />
  );
};

export default ConfirmPopupContainer;
