// SidebarButton.tsx
import React from 'react';

interface SidebarButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, onClick }) => {
  return (
    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-200 rounded p-2" onClick={onClick}>
      <i className={`fa fa-${icon} mr-2 text-blue-500`}></i>
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
};

export default SidebarButton;
