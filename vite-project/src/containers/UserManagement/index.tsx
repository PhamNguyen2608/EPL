import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { showConfirm } from '../../store/slices/confirmSlice'; 
import { RootState } from '../../store';
import UserTable from '../../component/UserTable';
import SearchBar from '../../component/SearchBar';
import Navbar from '../../component/NavBar/NavBar';
import Sidebar from '../../component/NavBar/Sidebar';
import SidebarButton from '../../component/Button/SideBarButton';
import ConfirmPopupContainer from "../ConfirmPopupContainer";
import AddUserForm from '../../component/AddUserForm';
import { useFetchData } from '../../hooks/useFetchData';
import { fetchUsers } from '../../api/userService';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useFetchData(fetchUsers, []);
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm, shallowEqual);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const handleShowConfirm = useCallback((id: number) => {
    setUserIdToDelete(id);
    dispatch(showConfirm());
  }, [dispatch]);

  const handleAddUser = useCallback(() => {
    setIsAddUserFormVisible(prevState => !prevState);
  }, []);
  console.log("re-render")
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-500 p-4"><Navbar /></div>
      <div className="h-4 bg-gray-100"></div>
      <div className="flex flex-row flex-grow">
        <div className="w-1/6 bg-white"><Sidebar /></div>
        <div className="w-5/6 flex flex-col items-center justify-center">
          <div className="w-3/4 flex justify-between items-center">
            <div className="w-1/2"><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
            <div className="mr-4"><SidebarButton icon="plus" label="Add User" onClick={handleAddUser} /></div>        
          </div>
          {isAddUserFormVisible && <div className="w-3/4 mt-4"><AddUserForm handleToggleAddUserForm={handleAddUser} /></div>}
          <div className="w-3/4 mt-4">
            {loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <UserTable users={users} onShowConfirm={handleShowConfirm} />}
          </div>
          {isPopupVisible && <ConfirmPopupContainer userIdToDelete={userIdToDelete} users={users} />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserManagement);
