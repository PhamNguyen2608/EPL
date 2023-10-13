import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { showConfirm } from '../../store/slices/confirmSlice'; 
import { RootState } from '../../store';
import UserTable from '../../component/UserTable';
import SearchBar from '../../component/SearchBar';
import Navbar from '../../component/NavBar/NavBar';
import Sidebar from '../../component/NavBar/SideBar';
import SidebarButton from '../../component/Button/SideBarButton';
import ConfirmPopupContainer from "../ConfirmPopupContainer";
import AddUserForm from '../../component/AddUserForm';
import  useFetchData  from '../../hooks/useFetchData';
import _ from 'lodash';
import useDebounce from '../../hooks/useDebounce';
import { sidebarData } from '../../data/sidebarData';


const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state: RootState) => state.confirm.showConfirm, shallowEqual);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const { users  } = useFetchData();
  // console.log('users: ', users);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    console.log("Debounced search term is: ", debouncedSearchTerm); 
  }, [debouncedSearchTerm]);
  const filteredUsers = _.filter(users, (user) => {
    return (
      _.includes(_.toLower(user.email), _.toLower(debouncedSearchTerm)) || 
      _.includes(_.toLower(user.name), _.toLower(debouncedSearchTerm))  
    );
  });
  


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
        <div className="w-1/6 bg-white"><Sidebar items={sidebarData} /></div>
        <div className="w-5/6 flex flex-col items-center justify-center">
          <div className="w-3/4 flex justify-between items-center">
            <div className="w-1/2"><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
            <div className="mr-4"><SidebarButton icon="plus" label="Add User" onClick={handleAddUser} /></div>        
          </div>
          {isAddUserFormVisible && <div className="w-3/4 mt-4"><AddUserForm handleToggleAddUserForm={handleAddUser} /></div>}
          <div className="w-3/4 mt-4">
             <UserTable users={filteredUsers} onShowConfirm={handleShowConfirm} />
          </div>

          {isPopupVisible && <ConfirmPopupContainer userIdToDelete={userIdToDelete} />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserManagement);
