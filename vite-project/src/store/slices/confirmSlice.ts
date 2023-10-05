// store/slice/confirmSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const confirmSlice = createSlice({
  name: 'confirm',
  initialState: {
    showConfirm: false,
  },
  reducers: {
    showConfirm: (state) => {
      state.showConfirm = true;
    },
    hideConfirm: (state) => {
      state.showConfirm = false;
    },
  },
});

export const { showConfirm, hideConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
