// useFetchUsers.ts
import { useState, useEffect } from 'react';
import { fetchUsers } from '../api/userService';


interface User {
  id: number;
  name: string;
  email:string
  role: string;
}

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<Error | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) { // Kiểm tra kiểu dữ liệu
          setError(error);
        }
      } finally {
        setLoading(false); // setLoading(false) được gọi
      }
    };

    fetchData();
  }, []);

  return { users, setUsers, loading, error };
};
