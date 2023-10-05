// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import confirmReducer from './slices/confirmSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    confirm: confirmReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
