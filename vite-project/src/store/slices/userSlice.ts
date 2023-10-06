import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers as fetchUsersAPI } from '../../api/userService';

interface User{
    
    id: number;
    name:string;
    email:string
}

interface UserState {
    users: User[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error?: string | null;
  }
  
  

  const initialState: UserState = {
    users: [],
    loading: 'idle',
    error: null
  };
  
  console.log("Initial State:", initialState);
  export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await fetchUsersAPI();
    return users;
  });
  
  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

      addUser: (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      },
      
      deleteUser: (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      },

      updateUser: (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.loading = 'pending';
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.users = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
          });
      }
  });
  

  export const { addUser, deleteUser, updateUser } = userSlice.actions;
  export default userSlice.reducer;