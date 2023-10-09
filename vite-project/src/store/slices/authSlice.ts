import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService, { LoginResponse } from '../../api/authSevice';
import { setCookie, getCookie } from '../../utils/cookies';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: getCookie('token') || null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await authService.login(credentials);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
      setCookie('token', action.payload.token);
      console.log("Current cookies:", document.cookie);
    });
  },
});

export default authSlice.reducer;
