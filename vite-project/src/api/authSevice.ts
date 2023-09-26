import axios from 'axios';

export interface LoginResponse {
  token: string;
}

const authService = {
  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    console.log('credentials: ', credentials);

    const response = await axios.post<LoginResponse>('https://reqres.in/api/login', credentials);
    return response.data;
  }
};

export default authService;
