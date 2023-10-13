import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

interface SideItemProps {
  label: string;
  path: string;
  icon: string;
}

const SideItem: React.FC<SideItemProps> = ({ label, path, icon }) => {
  return (
    <li className="text-white hover:bg-gray-200 px-4 py-2 rounded-lg">
      <Link to={path} className="flex items-center">
        <i className={`fa fa-${icon} text-lg mr-2`}></i>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SideItem;
