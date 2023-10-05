import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Sidebar: React.FC = () => {
  return (
    <div className=" text-white h-full p-4" style={{backgroundColor:"#3F1052"}}>
      {/* Logo or Brand Name */}
      <div className="mb-8 flex justify-center items-center">
        <i className="fa fa-cogs text-3xl"></i>
        <span className="text-2xl ml-2">EPL</span>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {/* User Management */}
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <i className="fa fa-user mr-2"></i>
          <span>User Management</span>
        </li>

        {/* Other Menu Items */}
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <i className="fa fa-cog mr-2"></i>
          <span>Settings</span>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <i className="fa fa-envelope mr-2"></i>
          <span>Messages</span>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
