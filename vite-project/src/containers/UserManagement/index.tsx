import React, { useState } from 'react';
import UserTable from '../../component/UserTable';
import SearchBar from '../../component/SearchBar';
import Navbar from '../../component/NavBar/NavBar';
import Sidebar from '../../component/NavBar/Sidebar';
import SidebarButton from '../../component/Button/SideBarButton';  
import { useDispatch, useSelector } from 'react-redux';
import { showConfirm } from '../../store/slices/confirmSlice'; 
import { RootState } from '../../store';
import ConfirmPopupContainer from "../ConfirmPopupContainer"
import { useFetchUsers } from '../../hooks/useFetchUsers'; 
import AddUserForm from '../../component/AddUserForm';

interface UserType {
  name: string;
  email: string;
  role: string;
}

interface User extends UserType {
  id: number;
}

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { users, setUsers, loading, error } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm); 
  const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);

  
  
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

const handleShowConfirm = (id:number) => {
  setUserIdToDelete(id);
  dispatch(showConfirm());  
};



  const handleAddNewUser = (newUser: UserType) => {
    const newUserWithId: User = { id: users.length + 1, ...newUser }; // Tạo ID mới cho user
    setUsers([...users, newUserWithId]);
  }
  

  const handleAddUser = () => {
    setIsAddUserFormVisible(!isAddUserFormVisible);
  };
  const handleToggleAddUserForm = () => {
    setIsAddUserFormVisible(!isAddUserFormVisible);
  };
  
  // const handleUpdateUser = (updatedUser: User) => {
  //   // Tìm index của user cần cập nhật trong mảng 'users'
  //   const indexToUpdate = users.findIndex(user => user.id === updatedUser.id);
  
  //   // Kiểm tra xem user có được tìm thấy không
  //   if (indexToUpdate > -1) {
  //     // Cập nhật thông tin của user
  //     const updatedUsers = [...users]; // Tạo một bản sao của mảng 'users'
  //     updatedUsers[indexToUpdate] = updatedUser; // Cập nhật thông tin user
  
  //     // Cập nhật lại state 'users' với mảng đã cập nhật
  //     setUsers(updatedUsers);
  
  //     // Ghi log để kiểm tra
  //     console.log('UI has been updated with the new user information:', updatedUser);
  //   } else {
  //     console.log('User with given ID not found.');
  //   }
  // };
  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
  
    setUsers(updatedUsers);
  
    console.log('UI has been updated with the new user information:', updatedUser);
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
           {/* Add User Form */}
        {isAddUserFormVisible && (
          <div className="w-3/4 mt-4">
            <AddUserForm handleToggleAddUserForm={handleToggleAddUserForm} handleAddNewUser={handleAddNewUser} />

          </div>
        )}
          {/* User Table */}
          <div className="w-3/4 mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
          <UserTable handleUpdateUser={handleUpdateUser} users={filteredUsers} onShowConfirm={handleShowConfirm}  />
         
        </>
        )}
        
      </div>
          {isPopupVisible && <ConfirmPopupContainer userIdToDelete={userIdToDelete} users={users} setUsers={setUsers} />
}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
