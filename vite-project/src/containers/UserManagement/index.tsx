import React, { useState } from 'react';
import UserTable from '../../component/UserTable';
import SearchBar from '../../component/SearchBar';
import Navbar from '../../component/NavBar/NavBar';
import Sidebar from '../../component/NavBar/Sidebar';
import SidebarButton from '../../component/Button/SideBarButton';  
import { useDispatch, useSelector } from 'react-redux';
import { showConfirm } from '../../store/slices/confirmSlice'; 
import { RootState } from '../../store';  // Import RootState
import ConfirmPopupContainer from "../ConfirmPopupContainer"
import { useFetchUsers } from '../../hooks/useFetchUsers'; 
import Pagination from '../../component/Pagination';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm);  // Lấy trạng thái từ Redux
  const { users, loading, error } = useFetchUsers();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);  // Add this line
  const totalPages = Math.ceil(users.length / 20); 
  const handleShowConfirm = () => {
    console.log("Delete")
    dispatch(showConfirm());  // Dispatch action để hiển thị popup
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    // Logic to add a new user
    console.log("Add User button clicked");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="bg-blue-500 p-4">
        <Navbar />
      </div>

      {/* Space */}
      <div className="h-4 bg-gray-100"></div>

      {/* Main Content */}
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <div className="w-1/6 bg-white">
          <Sidebar />
        </div>

        {/* Table and Search */}
        <div className="w-5/6 flex flex-col items-center justify-center">
          {/* Search Bar and Add User Button */}
          <div className="w-3/4 flex justify-between items-center">
          <div className="w-1/2">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="mr-4"> 
            <SidebarButton icon="plus" label="Add User" onClick={handleAddUser} />
          </div>        
          </div>
          {/* User Table */}
          <div className="w-3/4 mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
          <UserTable users={filteredUsers} onShowConfirm={handleShowConfirm} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
        )}
        
      </div>
          {isPopupVisible && <ConfirmPopupContainer />}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
