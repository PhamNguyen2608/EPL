// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import confirmReducer from './slices/confirmSlice'; 
import userReducer from './slices/userSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    confirm: confirmReducer, 
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
