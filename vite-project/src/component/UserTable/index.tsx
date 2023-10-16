import React, { useState, useEffect } from 'react';
import UserRow from './UserRow'; // Import UserRow component
import Pagination from '../Pagination';
import { User } from '../../types/userTypes';
import axios from 'axios'; 
import { useNavigate,useSearchParams  } from 'react-router-dom';


interface UserTableProps {
  onShowConfirm: (id: number) => void;
}
interface Links {
  self?: { href: string };
  prev?: { href: string };
  next?: { href: string };
}



const UserTable: React.FC<UserTableProps> = ({ onShowConfirm }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [links, setLinks] = useState<Links>({});

  useEffect(() => {
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;

    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/users?page=${page}`;
        const response = await axios.get(url);
        setUsers(response.data._embedded.users);
        setLinks(response.data._links);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('There was an error fetching data', error);
      }
    };

    fetchData();
  }, [searchParams]);


  const handlePageChange = async (page: number) => {
  
    navigate(`?page=${page}`);
    try {
      const url = `http://localhost:3000/users?page=${page}`;
      const response = await axios.get(url);
      setUsers(response.data._embedded.users);
      setLinks(response.data._links);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };
  
  

  
  

  return (
    <div className="overflow-auto h-[500px] w-[800px] rounded-lg shadow-lg bg-white">
      <table className="min-w-full">
        <thead>
          <tr>
        
          
          <th className="text-left py-2 px-3 border-b border-gray-200">ID</th>
          <th className="text-left py-2 px-3 border-b border-gray-200">Name</th>
          <th className="text-left py-2 px-3 border-b border-gray-200">Email</th>
          <th className="text-left py-2 px-3 border-b border-gray-200">Role</th>
          <th className="text-left py-2 px-3 border-b border-gray-200">Actions</th>
      
        
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow 
              key={user.id}
              id={user.id}
              name={user.name}
              firstname={user.firstname}
              lastname={user.lastname}
              email={user.email}
              role={user.role}
              onShowConfirm={onShowConfirm}
            />
          ))}
        </tbody>
      </table>
      <Pagination 
        currentPage={links.self ? parseInt(new URL(links.self.href).searchParams.get("page") as string, 10) : 1}
        handlePageChange={handlePageChange}
        prevLink={links.prev ? links.prev.href : null}
        nextLink={links.next ? links.next.href : null}
        totalItems={totalItems}
      />
    </div>
  );
};

export default UserTable;
