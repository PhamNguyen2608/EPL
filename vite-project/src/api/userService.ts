
import axios from 'axios';

const apiClient = axios.create({

  baseURL: 'https://jsonplaceholder.typicode.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('apiClient: ', apiClient);
export const fetchUsers = async () => {
    const response = await apiClient.get('/users');
    return response.data;
  };
  
