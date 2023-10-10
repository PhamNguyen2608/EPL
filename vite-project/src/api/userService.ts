
import axios from 'axios';

interface User{
  id: number;
  name: string;
  email: string;
}
const apiClient = axios.create({

  baseURL: 'https://jsonplaceholder.org', 
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('apiClient: ', apiClient);
export const fetchUsers = async () => {
    const response = await apiClient.get('/users');
    return response.data;
  };
  


export const deleteUser = async (id:number) =>{
  const response = await apiClient.delete(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: number, updatedUser: User) => {
  const response = await apiClient.put(`/users/${id}`, updatedUser);
  return response.data;
};

