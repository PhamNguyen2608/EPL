
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConfirm } from '../store/slices/confirmSlice';
import ConfirmPopup from '../component/ConfirmPopup/ConfirmPopup';
import { RootState } from '../store'; 

const ConfirmPopupContainer: React.FC = () => {
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm);

  const handleClose = () => {
    dispatch(hideConfirm());
  };

  const handleConfirm = () => {
    // Thực hiện hành động xóa ở đây
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
