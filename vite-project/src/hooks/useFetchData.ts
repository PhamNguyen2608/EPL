// useFetchData.ts
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store'; 
import { fetchUsers } from '../api/userService'; 
import { User } from '../types/userTypes';
interface FetchDataReturnType {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const useFetchData = (): FetchDataReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const fetchData = useCallback(async () => {
    try {
      await dispatch(fetchUsers()).unwrap();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      fetchData();
    }
  }, [status, fetchData]);

  return { users, status, error };
};

export default useFetchData;
