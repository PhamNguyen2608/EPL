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
import AddUserForm from '../../component/AddUserForm';
import  useFetchData  from '../../hooks/useFetchData';
import { fetchUsers } from '../../api/userService';

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
  const { data: users, setData: setUsers, loading, error } = useFetchData<User[]>(fetchUsers);
  console.log('users: ', users);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm); 
  const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);

  
  
  


  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

const handleShowConfirm = (id:number) => {
  setUserIdToDelete(id);
  dispatch(showConfirm());  
};



  const handleAddNewUser = (newUser: UserType) => {
    const newUserWithId: User = { id: users.length + 1, ...newUser }; 
    setUsers([...users, newUserWithId]);
  }
  

  const handleAddUser = () => {
    setIsAddUserFormVisible(!isAddUserFormVisible);
  };
  const handleToggleAddUserForm = () => {
    setIsAddUserFormVisible(!isAddUserFormVisible);
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
          <UserTable  users={users} onShowConfirm={handleShowConfirm}  />
         
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
