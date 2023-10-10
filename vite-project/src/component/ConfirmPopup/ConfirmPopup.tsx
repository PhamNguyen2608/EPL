// ConfirmPopup.tsx
import React from 'react';

interface ConfirmPopupProps {
  isPopupVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading:boolean;
  error:Error | null
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ isPopupVisible, onClose, onConfirm }) => {
  if (!isPopupVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-1/3">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Are you sure you want to delete this item?</h3>
        </div>
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            No
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
