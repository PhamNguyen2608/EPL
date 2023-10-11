import React, { useState } from 'react';
import Logo from '../Logo/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("re-render navbar")
  return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="h-5/5">
          <Logo />
        </div>

        {/* User Info and Dropdown */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
            <img
              src="your-avatar-url-here"
              alt="User Avatar"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <span className="text-white ml-2">Username</span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <div className="py-1">
                <button
                  onClick={() => {
                    // Handle logout logic here
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
