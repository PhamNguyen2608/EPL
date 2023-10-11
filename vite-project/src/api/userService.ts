
import axios from 'axios';
import { User } from '../types/userTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';


const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.org',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data; 
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
);
export const addUser = async (newUser: User) => {
  const response = await apiClient.post('/users', newUser);
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

