
import axios from 'axios';
import { User } from '../types/userTypes';



const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.org',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    const transformedData = response.data.map((apiData: any) => ({
      id: apiData.id,
      name: `${apiData.firstname} ${apiData.lastname}`,
      email: apiData.email,

    }));
    return transformedData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};




export const deleteUser = async (id:number) =>{
  const response = await apiClient.delete(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: number, updatedUser: User) => {
  const response = await apiClient.put(`/users/${id}`, updatedUser);
  return response.data;
};

